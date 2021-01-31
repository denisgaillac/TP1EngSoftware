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
        private readonly PerformanceRules _rules;
        public PerformanceController(Context contextDB){
            _rules = new PerformanceRules(contextDB);
        }

        [HttpGet]
        public IActionResult Index()
        {
            var today = DateTime.Now.Date;
            var filter = new FilterPerformanceDTO(){
                finalDate = today,
                initialDate = today.AddDays(-7)
            };
            return Ok(_rules.Filter(filter));
        }
        [HttpPost("[Action]")]
        public IActionResult Filter([FromBody] FilterPerformanceDTO filter)
        {
            return Ok(_rules.Filter(filter));
        }
        
    }
}