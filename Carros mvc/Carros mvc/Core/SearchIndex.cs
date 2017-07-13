using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Carros_mvc.Models;

namespace Carros_mvc.Core
{
    public class SearchIndex
    {

        public List<Parameters.DetailInfo> GetIndexedDetails(string detailId, bool findInAnalog)
        {
            List<Parameters.DetailInfo> list = new List<Parameters.DetailInfo>();
            SqlConnection conn =
              new SqlConnection(
                  @"Data Source=yakovenko2;User ID=cr_usr;Password=cmp_12345;Initial Catalog=db_Carros");
            try
            {
                DatabaseControl dbc = new DatabaseControl();
                SqlDataReader rd = dbc.GetDataFromDB("select * from dbo.search_index where detIndex=" + detailId, out conn);
                  if (rd != null)
                    while (rd.Read())
                    {
                      
                    }
            }
            catch (Exception)
            {


            }
            finally
            {
                conn.Close();
            }
          return list;

        }


    }
}