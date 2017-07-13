using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Carros_mvc.Core;
using Carros_mvc.Interfaces;


namespace Carros_mvc.Models
{
  public class DetailModels
    {
      public Dictionary<string, Parameters.DetailInfo> Details { get; set; }
      public  Dictionary<string,List<Parameters.DetailInfo>> SortedDetails { get; set; }
        public  string MaintTextBox { get; set; }
        public  bool FindInAnalog { get; set; }
        public int isAdmin { get; set; }
        public  bool startedFind = false;
        public bool Filtered = false;
    }

    public class LoadProviders
    {
        public static object GetLists()
        {
            List<IProvider>prv = new List<IProvider>();
            SqlConnection conn = new SqlConnection();
              try
            {
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.providers", out conn);
                if (rd != null)
                    while (rd.Read())
                    {
                        string provName = rd["id_provider"].ToString();
                        switch (provName)
                        {
                            case "1": // тут добавляем провайдеров для поиска
                            {
                                Aototo aototo = new Aototo();
                                prv.Add(aototo);
                                break;
                            }
                        }
                    }
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("DetailModelles: Ошибка при получении списка провайдеров: " + ex.Message);

            }
            finally
            {
                conn.Close();
            }
            
            return prv;

        }

    }
}