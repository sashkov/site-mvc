using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using Carros_mvc.Core;

namespace Carros_mvc.Models
{
    public class UserModel
    {
        public bool IsBasket = false;
        public bool IsParametets = false;
      
         public  string UserName { get; set; }
         public  int Id { get; set; }
         public  int IsAdmin { get; set; }
         public  string FirstName { get; set; }
         public  string LastName { get; set; }
         public  string Patronymic { get; set; } 

        public  List<string> detailsHashes  = new List<string>();
        public string UserSessionId { get; set; }
        public Dictionary<string, Parameters.DetailInfo> DetailsinBasket = new Dictionary<string, Parameters.DetailInfo>();
        public Dictionary<string, Parameters.DetailInfo> DetailsList = new Dictionary<string, Parameters.DetailInfo>();
        public Dictionary<string, List<Parameters.DetailInfo>> SortedDetails = new Dictionary<string, List<Parameters.DetailInfo>>();
        public void LogoutUser()
        {
            Id = 0;
            UserName = "";
            IsAdmin = 0;
            FirstName ="";
            LastName = "";
            Patronymic = "";
            detailsHashes.Clear();
            DetailsList.Clear();
         }

        public bool FindInAnalogs = false;
        public string MainTextBox = string.Empty;
        public bool GetUsersInfo(string userName)
        {
            SqlConnection conn = new SqlConnection();
            try
            {
                DatabaseControl dbctrl = new DatabaseControl();
                SqlDataReader rd =
                    dbctrl.GetDataFromDB("select * from dbo.UserProfile where Username='" + userName + "'", out conn);
                if (rd != null)
                {
                    while (rd.Read())
                    {
                        Id = int.Parse(rd["UserId"].ToString());
                        UserName = rd["UserName"].ToString();
                        string admin = rd["isAdmin"].ToString();
                        if (!String.IsNullOrEmpty(admin)) IsAdmin = int.Parse(rd["isAdmin"].ToString());
                        else IsAdmin = 0;
                       FirstName = rd["FirstName"].ToString();
                        LastName = rd["LastName"].ToString();
                        Patronymic = rd["Patronymic"].ToString();
                        return true;

                    }

                }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("UserModels:LoadUserInfo:"+ex.Message);

            }
            finally
            {
                conn.Close();
            }
            return false;
        }

        public static bool SaveUsersInfo(string parameters)
        {
            SqlConnection conn = new SqlConnection();
            string request;
            try
            {
                string[] allParameters = parameters.Split('|');
                foreach (string userParameters in allParameters)
                {
                    if (String.IsNullOrEmpty(userParameters)) continue;
                    string[] userParce = userParameters.Split(';');
                    if(userParce.Length<3)continue;
               request = "UPDATE dbo.UserProfile SET UserName = '" + userParce[7] + "', FirstName = '" +
                                         userParce[2] + "',  LastName = '" + userParce[1] + "',  Patronymic = '" +
                                         userParce[3] + "',  register_date = '" + userParce[5] + "', last_connect_date = '" +
                                         userParce[6] + "', isAdmin = " + userParce[4] + " WHERE UserName='" + userParce[7]+"'";
                        DatabaseControl dbctrl = new DatabaseControl();
                        SqlDataReader rd = dbctrl.GetDataFromDB(request, out conn);
                    rd.Read();
                }
                return true;

            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("UserModels:LoadUserInfo:" + ex.Message);

            }
            finally
            {
                conn.Close();
            }
            return false;
        }

    
       
        public bool GetUserBasket(string usrName)
        {
          SqlConnection conn = new SqlConnection();
            try
            {
                string request = String.Format("select * from dbo.Baskets where user_name='{0}'", usrName);
                    DatabaseControl dbctrl = new DatabaseControl();
                    SqlDataReader rd = dbctrl.GetDataFromDB(request, out conn);
                    if (rd != null)
                    {
                        detailsHashes.Clear();
                        DetailsinBasket.Clear();
                        while (rd.Read())
                        {
                            Parameters.DetailInfo di = new Parameters.DetailInfo();
                            di.Price = decimal.Parse(rd["detai_price"].ToString().Replace(".", ","));
                            di.Manuf = rd["detail_manuf"].ToString();
                            di.Name = rd["detail_name"].ToString();
                            di.SearchID = rd["detail_searchId"].ToString();
                            di.Storage = rd["detail_Storage"].ToString();
                            di.Code = rd["detail_Code"].ToString();
                            di.BaseCount = rd["detail_baseCount"].ToString();
                            di.PartId = rd["detail_PartId"].ToString();
                            di.DetNumber = rd["id_basket"].ToString();
                            di.Delivery = rd["detail_Delivery"].ToString();
                            di.DateofPlacetoBasket = rd["date_of_Upload_detail"].ToString();
                          string hash= rd["hash"].ToString();
                          detailsHashes.Add(hash);
                          DetailsinBasket.Add(hash,di);
                         }

                    }
   
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("UserModels:GetUserBasket:" + ex.Message);
                return false;
            }
            finally
            {
                conn.Close();
            }
            return true;
        }


        public static bool AddDetailToUserBasket(string userName, Parameters.DetailInfo detail)
        {
            SqlConnection conn = new SqlConnection();
            string request;
            try
            {
                request = String.Format("INSERT INTO dbo.Baskets (detai_price, " +
                                               "user_name, detail_name, detail_manuf, " +
                                               "detail_searchId, detail_Storage, " +
                                               "detail_Delivery, detail_PartId, " +
                                               "detail_baseCount, detail_Code, date_of_Upload_detail, hash) VALUES" +
                                        "({0},'{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}')",
                    detail.Price.ToString(CultureInfo.InvariantCulture).Replace(",", "."), userName, detail.Name,detail.Manuf, detail.SearchID, detail.Storage, detail.Delivery,
                    detail.PartId, detail.BaseCount,
                    detail.Code, detail.DateofPlacetoBasket, Manage.CalculateBasketDetailHash(detail));
                DatabaseControl dbctrl = new DatabaseControl();
                SqlDataReader rd = dbctrl.GetDataFromDB(request, out conn);
                if (rd.Read())
                {
                    return true;
                }

            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("UserModels:SetDetailToUserBasket:" + ex.Message);
                return false;
            }
            finally
            {
                conn.Close();
            }
            return true;
        }


        public static bool RemoveDetailFromUserBasket(string userName, string [] hashes)
        {
            try
            {
                List<string> commands = new List<string>();
                foreach (var hash in hashes)
                {
                    if (String.IsNullOrEmpty(hash))continue;
                    commands.Add(String.Format("DELETE FROM dbo.Baskets WHERE hash='{0}' and user_name='{1}'", hash,
                        userName));
                }
                DatabaseControl dbc = new DatabaseControl();
                string ex;
               return dbc.SetTransactionDb(commands,out ex);
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("UserModels:SetDetailToUserBasket:" + ex.Message);
                return false;
            }
        }


    }
}