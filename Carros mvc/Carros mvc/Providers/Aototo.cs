using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using Carros_mvc.Core;
using Carros_mvc.Interfaces;
using Carros_mvc.ru.avtoto.www;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Carros_mvc
{
    public class Aototo:IProvider
    {
       private const int ID = 1;
        private readonly string ProviderName = "";
       private readonly string UsrId = "";
       private readonly string Login = "";
       private readonly string Password = "";
        private readonly string _logPath = "/Logs/Providers";

        Dictionary<string,Parameters.DetailInfo> IProvider.GetDetailInfo(string detailCode, bool findAnalog, List<string> detailsInBasket)
        {
            WriteLog("==>>");
            string analog = "on";
            Dictionary<string,Parameters.DetailInfo> detailInfo = new Dictionary<string,Parameters.DetailInfo>();


            //DatabaseControl dbControl = new DatabaseControl();
            //detailInfo = dbControl.GetIndexedSearch(detailCode, findAnalog);
            //if (detailInfo.Count > 0) return detailInfo;

            using (AvtoTOService autotoService = new AvtoTOService())
            {
                long idReq = Singleton<Logger>.Instance.GetId();
                string retJons = @"{""user_id"":""" + UsrId + @""",""user_login"":"""
                                 + Login + @""",""user_password"":""" + Password
                                 + @""",""search_code"":""" + detailCode.Trim().Replace("\t","") + @""",""search_cross"":""" + "" + analog + "" + @"""}";
                WriteLog(string.Format("Request [{0}]: {1}", idReq, retJons.Replace(Password, "*****").Replace(Login, "*****")));
                string response = autotoService.SearchStart(retJons);
                WriteLog(string.Format("Response [{0}]: {1}", idReq, response.Replace(Password, "*****").Replace(Login, "*****")));
                Dictionary<string, dynamic> responseDic = GetJsondata(response);
                string requestId = responseDic["ProcessSearchId"].ToString();
                int actCount = 0;
                while (true)
                {
                    idReq = Singleton<Logger>.Instance.GetId();
                    if (actCount > 3) break;
                    Thread.Sleep(1500);
                    retJons = @"{""ProcessSearchId"":""" + requestId + "\"}";
                    WriteLog(string.Format("Request [{0}]: {1}", idReq, retJons.Replace(Password, "*****").Replace(Login, "*****")));
                    response = autotoService.SearchGetParts(retJons);
                    WriteLog(string.Format("Response [{0}]: {1}", idReq, response.Replace(Password, "*****").Replace(Login, "*****")));
                    responseDic = GetJsondata(response);

                    string valinfo = responseDic["Info"].ToString();
                    bool whait;
                    CheckError(valinfo, out whait);
                    if (whait) continue; // если запрос в обработке то ждем еще
                    JArray val = responseDic["Parts"];
                    JContainer info = responseDic["Info"];
                    string id = info.First.ToString().Split(':')[1].Replace("\"", "");
                    if (val != null)
                    {
                        DatabaseControl dc = new DatabaseControl();
                        Dictionary<string, Parameters.DetailInfo> dic = new Dictionary<string, Parameters.DetailInfo>();
                        foreach (JContainer container in val.Children())
                        {
                            string detailParametersString = container.ToString();
                            Parts part = JsonConvert.DeserializeObject<Parts>(detailParametersString);
                            Parameters.DetailInfo di = new Parameters.DetailInfo();
                            di.PartId = part.AvtotoData["PartId"];
                            di.Name = part.Name;
                            di.RealPrice = part.Price;
                            di.Price = Manage.GetSummWithComission(part.Price);
                            di.Code = part.Code;
                            di.BaseCount = part.BaseCount;
                            di.Delivery = part.Delivery;
                            di.Storage = part.Storage;
                            di.Manuf = part.Manuf;
                            di.SearchID = id;
                            int totalDays;
                            string hash  = Manage.CalculateDetailHash(di, out totalDays);
                            di.Hash = hash;
                            if (detailsInBasket.Contains(hash)) di.InBasket = true;
                            di.AverageDelivery = totalDays;
                            if (dic.ContainsKey(hash))
                            {
                                Parameters.DetailInfo detailInfoTEmp = dic[hash];
                                if (detailInfoTEmp.RealPrice <=di.Price)// если сумма меньше
                                {
                                    if (detailInfoTEmp.AverageDelivery <= di.AverageDelivery)continue;
                                    if((detailInfoTEmp.AverageDelivery-di.AverageDelivery)<2)continue;
                                    
                                }
                                else dic[hash] = di;
                                
                            }
                            else
                            {
                              dic.Add(hash,di);  
                            }
                            if(!detailInfo.ContainsKey(hash)) detailInfo.Add(hash,di);
                        
                        }
                        dc.SetIndexedSearch(dic, detailCode, ID, findAnalog);
                        break;
                    }
                    actCount++;
                }
            }
            return detailInfo;
        }

       public Aototo()
        {
           SqlConnection conn = new SqlConnection();
           try
           {
               DatabaseControl dbc = new DatabaseControl();
               SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.providers where id_provider=" + ID,out conn);
                if (rd != null)
                    while (rd.Read())
                    {
                       UsrId = rd["provider_user_id"].ToString().Trim();
                       Password = rd["provider_password"].ToString().Trim();
                       Login = rd["provider_user"].ToString().Trim();
                        ProviderName = rd["provider_name"].ToString().Trim();
                    }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("Aototo: Ошибка при получении данных провайдера: "+ex.Message);
            }
            finally
            {
                conn.Close();
            }
           _logPath = _logPath + "/" + ProviderName;
        }

        string IProvider.Name
        {
            get { return ProviderName; }
        }

        public int Id
        {
            get { return ID; }
        }

        public string LogPath
        {
            get { return _logPath; }
        }

        public void WriteLog(string message)
        {
            string logPAth = HttpContext.Current.Server.MapPath(_logPath);
            if (!Directory.Exists(logPAth)) Directory.CreateDirectory(logPAth);
            Singleton<Logger>.Instance.WriteProviderLine(message, logPAth);
        }


        public struct Parts
        {
            public string Code { get; set; }
            public string Manuf { get; set; }
            public string Name { get; set; }
            public int Price { get; set; }
            public string Storage { get; set; }
            public string Delivery { get; set; }
            public string MaxCount { get; set; }
            public string BaseCount { get; set; }
            public string StorageDate { get; set; }
            public int DeliveryPercent { get; set; }
            public Dictionary<string,string> AvtotoData { get; set; }
         }


        private void CheckError(string response, out bool whait)
        {
            whait = false;
            Dictionary<string, dynamic> dic = GetJsondata(response);
            string info = dic["Errors"].ToString();
            info = info.Replace("[", "").Replace("]", "").Trim();
            if (info != string.Empty)
            {
                if (!info.Contains("Запрос в обработке")) throw new Exception(dic["Errors"].ToString());
                whait = true;
            }
        }


    
        public bool AddDetailToBasket(string code,string manuf,string name, string price,string storage,string delevery,string count,string partId,string searchid,string remoteId,string comment)
        {
            long idReq = Singleton<Logger>.Instance.GetId();
            using (AvtoTOService autotoService = new AvtoTOService())
            {
                string request =
                    string.Format("{{\"user\":{{\"user_id\":{0}, \"user_login\":\"{1}\", \"user_password\":\"{2}\"}}, \"parts\": [{{\"Code\":\"{3}\", \"Manuf\":\"{4}\", \"Name\":\"{5}\" " +
                        ", \"Price\":{6}, \"Storage\":\"{7}\", \"Delivery\":\"{8}\", \"Count\":{9}, \"PartId\":{10}, \"SearchID\":\"{11}\", \"RemoteID\":{12}, \"Comment\":\"{13}\"}}]}}",
                        UsrId, Login, Password, code, manuf, name, price, storage, delevery, count, partId, searchid, remoteId, comment);
                WriteLog(string.Format("Request [{0}]: {1}", idReq, request.Replace(Password, "*****").Replace(Login, "*****")));
                string response = autotoService.AddToBasket(request);
                WriteLog(string.Format("Response [{0}]: {1}", idReq, response.Replace(Password, "*****").Replace(Login, "*****")));
                Dictionary<string, dynamic> responseDic = GetJsondata(response);
                foreach (KeyValuePair<string,object> kvp in responseDic)
                {
                    switch (kvp.Key)
                    {
                        case  "Done":
                        {
                            if ((kvp.Value as IEnumerable<object>).Count() > 0)
                            {
                                return true;
                            }
                            break;
                        }
                        case "Errors":
                        {
                            if ((kvp.Value as IEnumerable<object>).Count() > 0)
                            {
                                throw new Exception(response);
                            }
                            break;
                        }
                    }
                }
            }
            return false;
        }

        private Dictionary<string, dynamic> GetJsondata(string jsonString)
        {
            return  JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(jsonString);
        }


      
    }
}
