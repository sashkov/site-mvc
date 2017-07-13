using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Web.Configuration;

namespace Carros_mvc.Core
{
    public class DatabaseControl
    {

        public SqlDataReader GetDataFromDB(string command, out SqlConnection conn)
        {
            try
            {
                conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            SqlCommand cmd = new SqlCommand(command, conn);
            cmd.CommandType = CommandType.Text;
            conn.Open();
            SqlDataReader rd = cmd.ExecuteReader();
            return rd;
            }
            catch (Exception ex)
            {
                Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:GetDataFromDB: "+ex.Message);
                throw new Exception(ex.Message);
            }
          }


        public bool SetTransactionDb(List<string> commands, out string exceptionMessage)
        {
            exceptionMessage = string.Empty;
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            conn.Open();
            string transId = Guid.NewGuid().ToString().Replace("-","");
            SqlTransaction transaction = conn.BeginTransaction(transId);
            try
            {
                SqlCommand command = conn.CreateCommand();
                command.Transaction = transaction;
                foreach (var commandText in commands)
                {
                    command.CommandText = commandText;
                    command.ExecuteNonQuery();
                }
                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                exceptionMessage = ex.Message;
                Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:SetTransactionDB: " + ex.Message);
                try
                {
                    transaction.Rollback();
                }
                catch (Exception rollbachex)
                {
                    Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:SetTransactionDB:Rollback:" +
                                                             rollbachex.Message);
                }

                return false;
            }
            finally
            {
                conn.Close();
            }
        }


        public List<Parameters.DetailInfo> GetIndexedSearch(string detailNumber, bool findAnalog)
        {
            int analog = 0;
            if (findAnalog) analog = 1;
            List<Parameters.DetailInfo> dinfo = new List<Parameters.DetailInfo>();
            string command = "select * from dbo.search_index where det_code='" + detailNumber + "' and analog=" + analog;
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            try
            {
                SqlCommand cmd = new SqlCommand(command, conn);
                cmd.CommandType = CommandType.Text;
                conn.Open();
                SqlDataReader rd = cmd.ExecuteReader();
                if (rd != null)
                {

                    while (rd.Read())
                    {
                        Parameters.DetailInfo di = new Parameters.DetailInfo();
                        di.BaseCount = rd["detail_basecount"].ToString();
                        di.Code = rd["det_code"].ToString();
                        di.Delivery = rd["detail_delivery"].ToString();
                        di.Manuf = rd["detail_manuf"].ToString();
                        di.Name = rd["detail_name"].ToString();
                        di.PartId = rd["detail_partId"].ToString();
                        di.Price = decimal.Parse(rd["price"].ToString());
                        di.SearchID = rd["id_request"].ToString();
                        di.Storage = rd["detail_detStorage"].ToString();
                        di.DetNumber = rd["detIndex"].ToString();
                        dinfo.Add(di);
                    }
                }
            }
            catch (Exception ex)
            {

                Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:GetIndexedSearch:  " + ex.Message);
            }
            finally
            {
                conn.Close();
            }

            return dinfo;
        }


        public bool SetIndexedSearch(Dictionary<string, Parameters.DetailInfo> dinfoList, string detIndex, int idProvider, bool findAnalog)// запись информации по поиску в базу
        {
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            conn.Open();
            SqlTransaction transaction =
                 conn.BeginTransaction(DateTime.Now.ToString("yyyyMMddhhmmss") + detIndex);
         try
            {

                foreach (KeyValuePair<string, Parameters.DetailInfo> di in dinfoList)
                {
                    string command = "INSERT INTO dbo.search_index VALUES (" +
                       string.Format(
                           "'{0}',{1},'{2}','{3}','{4}',{5},'{6}','{7}','{8}','{9}','{10}','{11}',NULL,NULL,NULL,NULL,NULL",
                            di.Key,idProvider, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), di.Value.SearchID, di.Value.Name, di.Value.Price.ToString(CultureInfo.InvariantCulture).Replace(",","."), di.Value.Manuf, di.Value.PartId,
                           di.Value.BaseCount, di.Value.Delivery, di.Value.Storage, di.Value.Code) + ")";
                    SqlCommand cmd = new SqlCommand(command, conn);
                    cmd.CommandType = CommandType.Text;
                    cmd.Transaction = transaction;
                    cmd.ExecuteNonQuery();
            }
                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                try
                {
                    transaction.Rollback();
                }
                catch (Exception exs)
                {
                    Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:SetIndexedSearch:Rollback:  " + ex.Message);
                 }
              
                Singleton<Logger>.Instance.WriteMainLine("DatabaseControl:SetIndexedSearch:  " + ex.Message);
            }
            finally
            {
                conn.Close();
            }

            return false;
        }
    }
}