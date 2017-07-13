using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace Carros_mvc.Controllers
{
    public class LoadTableController : Controller
    {
        //
        // GET: /LoadTable/

        public ActionResult Index()
        {

            Table table = new Table();
            table.ID = "MainTable";
            table.CssClass = "table";
            table.Width = new Unit("50%");
          
                TableHeaderRow thr = new TableHeaderRow();
                TableHeaderCell thc = new TableHeaderCell();
                thc.Text = "Название";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Производитель";

                thc.Width = thc.Text.Length + 4;
                thc.CssClass = "tableCell-gray";
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Номер запчасти";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Кратность заказа";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Срок доставки";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Склад";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "УИД запроса";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "Цена";
                thc.CssClass = "tableCell-gray";
                thc.Width = thc.Text.Length + 4;
                thr.Cells.Add(thc);

                thc = new TableHeaderCell();
                thc.Text = "  ";
                thc.CssClass = "tableCell-gray";
                thr.Cells.Add(thc);
                table.Rows.Add(thr);
            List<Table> list = new List<Table>();
            list.Add(table);
            return View(list);
        }

    }
}
