using System;
using System.Collections.Generic;
using System.Text;
using Carros_mvc.Models;

namespace Carros_mvc.Core
{
	public class Manage
	{

	    public static decimal GetSummWithComission(decimal summ)
	    {
	        decimal value = summ;
            foreach (AdminModel.Comission comission in AdminModel.ComissionList)
	        {
	            if (summ >= comission.From && summ <= comission.To)
	            {
	                if (comission.Type == 1)
	                {
                        return Math.Round(summ+((summ * comission.Value) / 100), 2);
	                }
	              return (summ + comission.Value);
	                
	            }
	        }
	       return value;
	    }

	    private static string CreateHash(string message)
	    {
	        string strHash = string.Empty;
	        foreach (
	            byte b in
	                new System.Security.Cryptography.MD5CryptoServiceProvider().ComputeHash(
	                    Encoding.Default.GetBytes(message)))
	        {
	            strHash += b.ToString("x2");
	        }
	        return strHash;
	    }

        public static string CalculateDetailHash(Parameters.DetailInfo detailInfo, out int totalDays)
		{
	        string[] parceDeliv = detailInfo.Delivery. Split('-');
	        totalDays = 0;// всего дней
	        for (int i = 0; i < parceDeliv.Length; i++)
	        {
	            totalDays = totalDays + int.Parse(parceDeliv[i]);
	        }
	        totalDays = totalDays/2;
             return CreateHash(detailInfo.Name.ToLower() + detailInfo.Manuf.ToLower() +detailInfo.Storage.ToLower());
         }


        public static string CalculateBasketDetailHash(Parameters.DetailInfo detailInfo)
        {
           return CreateHash(detailInfo.Name.ToLower() + detailInfo.Manuf.ToLower() + detailInfo.Storage.ToLower());
        }

	}
}