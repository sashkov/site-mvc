using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carros_mvc.Interfaces
{
    interface IProvider
    {
        string Name { get; }
        int Id { get; }
        Dictionary<string,Parameters.DetailInfo> GetDetailInfo(string detailId, bool findAnalog, List<string> detailsInBasket);
        string LogPath { get; }
        void WriteLog(string message);
    }
}
