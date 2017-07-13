using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Carros_mvc.Core;
using Carros_mvc.Models;


namespace Carros_mvc.Controllers
{
    public class CatalogsController : Controller
    {
        //
        // GET: /Catalogs/

        public ActionResult Index(string link, string name)
        {
            BrandModel bm = new BrandModel();
            bm.Link = link;
            bm.Name = name;
            return View("BrandCatalog", bm);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult SaveCatalogs(string parameters)
        {
            ContentResult cr  = new ContentResult();
            cr.Content = "1";
            parameters = HttpUtility.UrlDecode(parameters);
            string[] parce = parameters.Split('|');
            List<string> requests = new List<string>();
            requests.Add("TRUNCATE TABLE dbo.Catalogs");
            DatabaseControl dbc = new DatabaseControl();
            foreach (var catalog in parce)
            {
                string decodeCatalog = Encoding.GetEncoding(1251).GetString(Convert.FromBase64String(catalog));
                if(catalog.Trim()==string.Empty)continue;
                string catalogName = decodeCatalog.Split('|')[0];
                string catalogPath = decodeCatalog.Split('|')[1];
                string request =
                    string.Format("INSERT INTO [dbo].[Catalogs]([Name_of_Catalog],[IFrameLink]) VALUES ('{0}','{1}')",
                        catalogName, catalogPath);
                requests.Add(request);
            }
            string exceptionMessage;
            if (dbc.SetTransactionDb(requests, out exceptionMessage)) cr.Content = "0";
            else cr.Content = exceptionMessage;
            return cr;
         }

    }
}
