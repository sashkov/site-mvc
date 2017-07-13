using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Carros_mvc.Core;
using Carros_mvc.Interfaces;
using Carros_mvc.Models;


namespace Carros_mvc.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [ValidateInput(false)]
        public ActionResult Index()
        {
            string detailId = this.Request.QueryString["part_num"];
            if (detailId != null)
            {
                return StartFind("", detailId, "true");
            }
            DetailModels dsst = new DetailModels();
            dsst.Details = new Dictionary<string, Parameters.DetailInfo>();
            dsst.MaintTextBox = "";
            dsst.FindInAnalog = false;
            if (Request.IsAuthenticated)
            {

                if (Session[User.Identity.Name]==null)
                {
                    UserModel um = new UserModel();
                    um.GetUsersInfo(User.Identity.Name);
                    um.GetUserBasket(User.Identity.Name);
                    Session[User.Identity.Name] = um;
                   
                  
                }
                else
                {
                    dsst.Details = (Session[User.Identity.Name] as UserModel).DetailsList;
                    dsst.SortedDetails = (Session[User.Identity.Name] as UserModel).SortedDetails;
                }


            }
            ViewBag.Message = "Поиск автозапчастей по каталогам";
            return View(dsst);
        }

        [ValidateInput(false)]
        public ActionResult About()
        {
            ViewBag.Message = "";

            return View();
        }
        [ValidateInput(false)]
        public ActionResult Contact()
        {
            ViewBag.Message = "";

            return View();
        }

        [ValidateInput(false)]
        public ActionResult Catalogs(string a)
        {
            CatalogsModel.LoadCatalogs();
            ViewBag.Message = "";
            return View();
        }



      
     [ValidateInput(false)]
        [HttpPost]
        public ActionResult StartFind(string action, string mainTextBox, string analogFind)
        {
       
            Singleton<Logger>.Instance.WriteMainLine("Старт поиска");
            if (mainTextBox == null) mainTextBox = string.Empty;
             bool findAnalogs = analogFind != null;
             UserModel um = Session[User.Identity.Name] as UserModel;
            if (um != null)
            {
                um.MainTextBox = mainTextBox;
                um.FindInAnalogs = findAnalogs;
                um.GetUserBasket(User.Identity.Name);
                  Response.Cookies.Add(new HttpCookie("usrName",um.UserName));
             }
            else um = new UserModel();
            DetailModels dsst = new DetailModels();
            dsst.FindInAnalog = findAnalogs;
            dsst.MaintTextBox = mainTextBox;
            dsst.isAdmin = um.IsAdmin;
           dsst.startedFind = true;
            dsst.Details = new Dictionary<string, Parameters.DetailInfo>();
            try
            {
                AdminModel.GetComissions();
                ViewBag.Message = "Поиск автозапчастей по каталогам";
                Singleton<Logger>.Instance.WriteMainLine("Комиссии загружены");
                if (mainTextBox.Trim() != "")
                {
                    List<IProvider> providerList = LoadProviders.GetLists() as List<IProvider>;
                    Singleton<Logger>.Instance.WriteMainLine("Список провайдеров загружен");
                    foreach (IProvider provider in providerList)
                    {
                        um.DetailsList = provider.GetDetailInfo(mainTextBox, findAnalogs, um.detailsHashes);
                        Singleton<Logger>.Instance.WriteMainLine("Список запчастей провайдера "+provider.Name +" загружен");
                        dsst.Details= um.DetailsList;
                        dsst.FindInAnalog = findAnalogs;
                        dsst.MaintTextBox = mainTextBox;
                        foreach (KeyValuePair<string, Parameters.DetailInfo> di in dsst.Details) // сортировка запчастей
                        {
                            if (dsst.SortedDetails==null)dsst.SortedDetails = new Dictionary<string, List<Parameters.DetailInfo>>();
                            if (dsst.SortedDetails.ContainsKey(di.Value.Manuf))
                            {
                                if (dsst.SortedDetails[di.Value.Manuf][0].Price > di.Value.Price)dsst.SortedDetails[di.Value.Manuf][0] = di.Value;
                            }
                            else
                            {
                                List<Parameters.DetailInfo>list = new List<Parameters.DetailInfo>();
                                list.Add(di.Value);
                                dsst.SortedDetails.Add(di.Value.Manuf, list);
                            }
                            
                        }
                        um.SortedDetails = dsst.SortedDetails;
                        Singleton<Logger>.Instance.WriteMainLine("Запчасти отсорированы ");
                    }


                }
            }
              
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("HomeController:StartFind: " + ex.Message + ";" + ex.StackTrace);
            }
            return View("Index", dsst);
        }


     [HttpPost]
     [AllowAnonymous]
     public ActionResult Fltr(string parameters)
     {
         ContentResult cr = new ContentResult();
         cr.Content = "1";
         parameters = HttpUtility.UrlDecode(parameters);
         string[] parce = parameters.Split('|');
         string searchId = parce[0];
         string[] manufparce = parce[1].Split(',');
         DetailModels dsst = new DetailModels();
         dsst.Details = new Dictionary<string, Parameters.DetailInfo>();
         DatabaseControl dbc = new DatabaseControl();
         SqlConnection conn = new SqlConnection();
         Dictionary<string, Parameters.DetailInfo> dic = new Dictionary<string, Parameters.DetailInfo>();
         foreach (var manuf in manufparce)
         {
             if (manuf.Trim() == string.Empty) continue;
             string requestmanuf = "and detail_manuf='" + manuf + "'";
             if (manuf == "#all") requestmanuf = string.Empty;
             SqlDataReader dr =
                 dbc.GetDataFromDB(
                     String.Format("select * from dbo.search_index where id_request='{0}' {1}", searchId, requestmanuf),
                     out conn);
           
             while (dr.Read())
             {
                 Parameters.DetailInfo di = new Parameters.DetailInfo();
                 di.Manuf = dr["detail_manuf"].ToString();
                 di.Name = dr["detail_name"].ToString();
                 di.Hash = dr["detHash"].ToString();
                 di.Delivery = dr["detail_delivery"].ToString();
                 di.BaseCount = dr["detail_basecount"].ToString();
                 di.Code = dr["det_code"].ToString();
                 di.PartId = dr["detail_partId"].ToString();
                 di.Price = decimal.Parse(dr["price"].ToString());
                 di.RealPrice = Manage.GetSummWithComission(di.Price);
                 di.SearchID = dr["id_request"].ToString();
                 di.Storage = dr["detail_detStorage"].ToString();
                 dsst.Filtered = true;
                 if (dic.ContainsKey(di.Hash))
                 {
                     Parameters.DetailInfo detailInfoTEmp = dic[di.Hash];
                     if (detailInfoTEmp.Price <= di.Price) // если сумма меньше
                     {
                         if (detailInfoTEmp.AverageDelivery <= di.AverageDelivery) continue;
                         if ((detailInfoTEmp.AverageDelivery - di.AverageDelivery) < 2) continue;

                     }
                     dic[di.Hash] = di;

                 }
                 else
                 {
                     dic.Add(di.Hash, di);
                 }
             }
              if (manuf == "all") break;
         }
        conn.Close();
         string auth = string.Empty;
         var authcookie = Request.Cookies.Get("Aurh");
         if (authcookie != null)auth = authcookie.Value;
         
         string response = "<table id=\"detailsTable\" class=\"table\">" +
                           "<tr><th class=\"mainth\" style=\"width: 25px\">п\\п</th>" +
                           "<th class=\"mainth\">Название</th><th class=\"mainth\" align=\"center\">" +
                           "Производитель</th><th class=\"mainth\" align=\"center\" >Срок доставки</th><th class=\"mainth\" align=\"center\" >Склад</th><th class=\"mainth\" align=\"center\" >Цена(руб.)</th>";
         if (auth == "1") response = response + "<th class=\"mainth\" align=\"center\" ></th>";
         response=response+ "</tr>";
         int i = 0;
         foreach (KeyValuePair<string,Parameters.DetailInfo> detailInfo in dic)
         {
          
             response = response + "<tr id=\"" + detailInfo.Value.Hash + "\">" +
                        "<td style=\"width: 15px\" class=\"maintd\" name=\"intex-" + i + "\">" + (i + 1) + "</td>" +
                        "<td class=\"maintd\" name=\"detName\" >" + detailInfo.Value.Name + "</td>" +
                        "<td class=\"maintd\" name=\"detManuf\">" + detailInfo.Value.Manuf + "</td>" +
                        "<td class=\"maintd\" name=\"detDelivery\">" + detailInfo.Value.Delivery + "</td>" +
                        "<td class=\"maintd\" name=\"detStorage\">" + detailInfo.Value.Storage + "</td>" +
                        "<td class=\"maintd\" name=\"detPrice\">" +
                        detailInfo.Value.Price.ToString("N", new NumberFormatInfo()) + "</td>";
             if (auth == "1") response = response + "<td class=\"maintd\" class=\"tableCell-gray\"><button name=\"tobasket\" id=\"" + detailInfo.Key + "\" type=\"submit\" class=\"buttonCarrito\" value=\"tobasket\" onclick=\"addToBaskt(this.id)\">в корзину</button></td></tr>";
             i++;
             }
             cr.Content = response + "</table>";
         
         return cr;
     }


        [ValidateInput(false)]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult AddDetailModels(string parameters)
        {
           UserModel um = Session[User.Identity.Name] as UserModel;
           try
            {
               if (um != null)
                {
                    if (parameters != null)
                    {
                        string detHash = parameters.Split('|')[1];
                        string command = parameters.Split('|')[0];
                        if (command == "toBasket")
                        {
                            um.DetailsinBasket.Add(detHash, um.DetailsList[detHash]);
                            um.DetailsinBasket[detHash].InBasket = true;
                            um.DetailsinBasket[detHash].DateofPlacetoBasket =DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                            UserModel.AddDetailToUserBasket(um.UserName, um.DetailsinBasket[detHash]);
                            //Aototo auAototo = new Aototo();
                            //auAototo.AddDetailToBasket(detCode, detManuf, detName, detPrice, detStorage, detDelivery, "1", detPartId,
                            //detSearchId, DateTime.Now.ToString("yyyyMMddHHmmss"), "");
                        }
                        else
                        {
                            if (um.DetailsList.ContainsKey(detHash))
                                um.DetailsList[detHash].InBasket = false;
                            if (!UserModel.RemoveDetailFromUserBasket(um.UserName, new[] {detHash}))
                            {
                                // пишем в логи и выводим ошибку
                            }
                            else
                            {
                                um.GetUserBasket(User.Identity.Name);
                            }
                        }
                    }
                }
                else
                {
                    return new ContentResult();
                }
            }
            catch (Exception exception)
            {
                string usrName = "Anonymous";
                if (um != null) usrName = um.UserName;
                Singleton<Logger>.Instance.WriteMainLine(String.Format("HomeController:AddDetailModels:[UN:{0}]\t{1} ", usrName, exception.Message));
                return new ContentResult { Content = exception.Message };
            }
            return new ContentResult{Content = "0"};
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetDetailInfo(string parameters)
        {
            string hash = parameters.Split('|')[0];
            string reqId = parameters.Split('|')[1];
            DatabaseControl dc = new DatabaseControl();
            SqlConnection conn=new SqlConnection();
            string response = "-1";
            try
            {
                decimal price = 0;
                SqlDataReader dr =
                    dc.GetDataFromDB(String.Format("select * from dbo.search_index where detHash='{0}' and id_request='{1}'", hash, reqId), out conn);
             while (dr.Read())
                {
                    string name = dr["detail_name"].ToString();
                    string manuf = dr["detail_manuf"].ToString();
                    string code = dr["det_code"].ToString();
                    int baseCount = int.Parse(dr["detail_basecount"].ToString());
                    decimal dbprice = decimal.Parse(dr["price"].ToString().Replace(".", ","));
                    if (price == 0)
                    {
                        price = dbprice;
                        response = String.Format("name={0}|manuf={1}|code={2}|price={3}|baseCount={4}", name, manuf, code,
                        price,
                        baseCount);
                    }
                 if(price>dbprice)
                 {
                     response = String.Format("name={0}|manuf={1}|code={2}|price={3}|baseCount={4}", name, manuf, code,
                        price,
                        baseCount);}
                  
                }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("HomeController:GetDetailInfo:" + ex.Message);

            }
            finally
            {
                conn.Close();
            }
            return new ContentResult{Content =Convert.ToBase64String(Encoding.GetEncoding(1251).GetBytes(HttpUtility.UrlEncode(response)))};
        }
    }
}
