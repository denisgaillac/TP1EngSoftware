using System;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using StudySmart.Models.Interfaces;
using StudySmart.Models.DataAccess;
using StudySmart.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Collections.Generic;

namespace StudySmart.Models.BusinessRules
{
    public class PerformanceRules
    {
        private ActivityDataAccess DataAccess;
        public PerformanceRules(Context contextDB) 
        {
            DataAccess = new ActivityDataAccess(contextDB);
        }

    }
}