using System;
using System.IO;
using System.Runtime.Serialization.Formatters;
using System.Text;
using System.Web;

namespace Carros_mvc
{
    public class Logger:Singleton<Logger>
    {
        public void WriteProviderLine(string message, string filePath = "")
        {
            try
            {
                filePath = filePath +"\\"+ DateTime.Now.ToString("yyyyMMdd") + ".log";
                StreamWriter sw = new StreamWriter(filePath, true, Encoding.GetEncoding(1251));
                sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "\t" + message);
                sw.Close();
            }
            catch (Exception ex)
            {
                WriteMainLine("Logger: Ошибка при записи лога провайдера- " + ex.Message+", лог:"+message);   
               
            }
         
        }

        public void WriteMainLine(string message)
        {
            string dir = HttpContext.Current.Server.MapPath("/Logs");
            string filePath = String.Format(dir+"\\Main_{0}.log",DateTime.Now.ToString("yyyyMMdd"));
            StreamWriter sw = new StreamWriter(filePath, true, Encoding.GetEncoding(1251));
            sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "\t" + message);
            sw.Close();
        }


        //public void WriteDbLine(string message)
        //{
        //    string dir = HttpContext.Current.Server.MapPath("/Logs/DB");
        //    string filePath = String.Format(dir + "\\Main_{0}.log", DateTime.Now.ToString("yyyyMMdd"));
        //    StreamWriter sw = new StreamWriter(filePath, true, Encoding.GetEncoding(1251));
        //    sw.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "\t" + message);
        //    sw.Close();
        //}

        public long GetId()
        {
            long reqId = 0;
            try
            {
                Random rm = new Random();
                reqId = rm.Next(1, 99999);
                string data = DateTime.Now.ToString("yymmddhhmmss");
                data = data + reqId;
                return long.Parse(data);
            }
            catch (Exception ex)
            {
                WriteMainLine("Logger: Ошибка при получении id запроса- " + ex.Message);

            }
            return reqId;
        }

    }
}