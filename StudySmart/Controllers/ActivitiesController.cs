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
    public class ActivitiesController : ControllerBase
    {
        private readonly Context context;
        private readonly ActivityRules _rules;

        public ActivitiesController(Context ContextDB){
            context = ContextDB;
           _rules = new ActivityRules(context);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_rules.FilterActivities());
        }

        [HttpPost("[Action]")]
        public IActionResult CreateActivity ([FromBody] ActivityDTO activityToCreate) 
        {
            try
            {
                return Ok(_rules.CreateActivity(activityToCreate));
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public JsonResult DeleteActivity (int idToDelete)
        {
            try
            {
                return _rules.DeleteActivity(idToDelete);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public JsonResult UpdateActivity (ActivityDTO activityToUpdate)
        {
            try
            {
                return _rules.UpdateActivity(activityToUpdate);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}