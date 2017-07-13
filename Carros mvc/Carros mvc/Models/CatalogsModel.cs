using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using Carros_mvc.Core;

namespace Carros_mvc.Models
{
    public class CatalogsModel
    {
        public static Dictionary<string, List<Brand>> CatalogsDic = new Dictionary<string, List<Brand>>();
        public struct Brand
        {
            public string Name;
            public string Link;
        }
        public static void LoadCatalogs()
        {
            CatalogsDic.Clear();
            string[] symbols = {
                 "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
                "V", "W", "X", "Y", "Z", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О",
                "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я"
            };
            foreach (var symbol in symbols)
            {
                CatalogsDic.Add(symbol,new List<Brand>());
            }
            SqlConnection conn = new SqlConnection();
            try
            {
              
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader dr = dbc.GetDataFromDB("Select * from dbo.Catalogs", out conn);
                if (dr != null)
                {
                    while (dr.Read())
                    {
                        Brand b = new Brand();
                        b.Name =  dr["Name_of_Catalog"].ToString();
                        b.Link = dr["IFrameLink"].ToString();
                        if (CatalogsDic.ContainsKey(b.Name.Substring(0, 1).ToUpper()))
                        {
                            CatalogsDic[b.Name.Substring(0, 1).ToUpper()].Add(b);
                        }
                        else
                        {
                            List<Brand> list = new List<Brand>();
                            list.Add(b);
                            CatalogsDic.Add(b.Name.Substring(0, 1).ToUpper(), list);
                        }
                       
                    }
                }

            }
            catch (Exception ex)
            {

                Singleton<Logger>.Instance.WriteMainLine("CatalogsModel:LoadCatalogs:" + ex.Message);
            }
            finally
            {
                conn.Close();
            }

        }

    }
}