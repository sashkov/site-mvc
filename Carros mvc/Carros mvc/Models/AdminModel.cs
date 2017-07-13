using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Carros_mvc.Core;

namespace Carros_mvc.Models
{
    public class AdminModel
    {

        public struct DataBaseUser
        {
            public  string UserName;
            public  int Id;
            public  int IsAdmin;
            public  string FirstName;
            public  string LastName;
            public  string Patronymic;
            public DateTime RegisterDate;
            public DateTime LastConnection;
        }

        public struct Comission
        {
            public int Index;
            public decimal From;
            public decimal To;
            public decimal Value;
            public decimal Type;
        }

        public static List<Comission> ComissionList;
        public static List<BrandModel> CatalogList;
        public static List<DataBaseUser> DataBaseUserList;
      


        public int isAdmin = 0;
        public bool SelectedUsers = false;
        public bool SelectedComissions = false;
        public bool SelectedCatalogs = false;

        public List<DataBaseUser> GetUserModels()
        {
           DataBaseUserList = new List<DataBaseUser>();
            SqlConnection conn = new SqlConnection();
            try
            {
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.UserProfile", out conn);
                if (rd != null)
                {
                    while (rd.Read())
                    {
                        DataBaseUser du = new DataBaseUser();
                        du.Id = int.Parse(rd["UserId"].ToString());
                        du.UserName = rd["UserName"].ToString();
                        string admin = rd["isAdmin"].ToString();
                        if (!String.IsNullOrEmpty(admin)) du.IsAdmin = int.Parse(rd["isAdmin"].ToString());
                        else du.IsAdmin = 0;
                        du.FirstName = rd["FirstName"].ToString();
                        du.LastName = rd["LastName"].ToString();
                        du.Patronymic = rd["Patronymic"].ToString();
                        du.RegisterDate = DateTime.Parse(rd["register_date"].ToString());
                        du.LastConnection = DateTime.Parse(rd["last_connect_date"].ToString());
                        DataBaseUserList.Add(du);
                    }
                }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("AdminModel:GetUserModels: "+ex.Message+";"+ex.StackTrace);
            }
            finally
            {
                conn.Close();
            }
            return DataBaseUserList;
        }


        public static  List<Comission> GetComissions()
        {
            ComissionList = new List<Comission>();
            SqlConnection conn = new SqlConnection();
            try
            {
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.Comissions", out conn);
                if (rd != null)
                {
                    while (rd.Read())
                    {
                        Comission comission = new Comission();
                        comission.Index = int.Parse(rd["index_value"].ToString());
                        comission.From = decimal.Parse(rd["from_value"].ToString().Replace(",","."));
                        comission.To = decimal.Parse(rd["to_value"].ToString().Replace(",", "."));
                        comission.Value = decimal.Parse(rd["value"].ToString().Replace(",", "."));
                        comission.Type = int.Parse(rd["type_value"].ToString());
                        ComissionList.Add(comission);
                    }
                }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("AdminModel:GetUserModels: " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return ComissionList;
        }


        public static List<Comission> GetCatalogs()
        {
            CatalogList = new List<BrandModel>();
            SqlConnection conn = new SqlConnection();
            try
            {
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.Catalogs", out conn);
                if (rd != null)
                {
                    while (rd.Read())
                    {
                        BrandModel bm = new BrandModel();
                        bm.Name = rd["Name_of_Catalog"].ToString();
                        bm.Link = rd["IFrameLink"].ToString();
                        CatalogList.Add(bm);
                    }
                }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("AdminModel:GetUserModels: " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return ComissionList;
        }


        public static bool SaveComissions(string parameters)
        {
            SqlConnection conn = new SqlConnection();
            string request = "";
            try
            {
                string[] allParameters = parameters.Split('|');
                foreach (string userParameters in allParameters)
                {
                    if (String.IsNullOrEmpty(userParameters)) continue;
                    string[] userParce = userParameters.Split(';');
                    string type = userParce[4];
                    if (type == "%") type = "1";
                    else type = "0";
                    if (userParce.Length < 3) continue;
                    request = "UPDATE dbo.Comissions SET from_value = " + userParce[1] + ", to_value = " +
                                              userParce[2] + ",  value = " + userParce[3] + ",  type_value = " +
                                              type + " WHERE index_value=" + userParce[0];
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



    }
}