using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.BusinessRules;
using StudySmart.Models.Data;
using StudySmart.Models.DTOs.Enums;
using Microsoft.AspNetCore.Cors;

namespace StudySmart.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PerformanceController : ControllerBase
    {
        private readonly ActivityRules _rules;
        public PerformanceController(Context contextDB){
            _rules = new ActivityRules(contextDB);
        }

        [HttpGet]
        public IActionResult Index()
        {
            var today = DateTime.Now;
            var firstDay = today.AddDays(-7);
            FilterDTO filter = new FilterDTO();
            return Ok("");
        }
        public PerformanceDTO Filter(FilterDTO filter)
        {
            return new PerformanceDTO();
        }
        
    }
}