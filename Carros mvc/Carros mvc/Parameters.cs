
using System.Web.Configuration;

namespace Carros_mvc
{
    public  class Parameters : Singleton<Parameters>
    {
        public class DetailInfo
        {
            public string Name { get; set; }
            public string PartId { get; set; }
            public decimal Price { get; set; } //  с комиссией
            public decimal RealPrice { get; set; } // без комиссии
            public string BaseCount { get; set; }
            public string Delivery { get; set; }
            public string Storage { get; set; }
            public string Code { get; set; }
            public string SearchID { get; set; }
            public string Manuf { get; set; }
            public string DetNumber { get; set; }
            public int AverageDelivery { get; set; }
            public bool InBasket = false;// признак наличия в корзине текущего юзера
            public string DateofPlacetoBasket { get; set; }
            public string Hash { get; set; }
        }

      public string ConnectionString { get; set; }

       public Parameters()
       {
           ConnectionString = WebConfigurationManager.ConnectionStrings["DB_CRRS"].ConnectionString;
       }


    }
}
