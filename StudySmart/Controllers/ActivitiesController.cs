using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.BusinessRules;
using StudySmart.Models.DTOs.Enums;
using Microsoft.AspNetCore.Cors;

namespace StudySmart.Controllers
{
    public class ActivitiesController : Controller
    {
        //private readonly ActivityRules rules;
        private ActivityRules rules{get; set;}

        public ActivitiesController(){
           rules = new ActivityRules();
        }

        // [HttpGet]
        // public IActionResult Index() // Read 
        // {
        //     return View();
        // }
        [HttpGet]
        public IActionResult Index(){
            var activity = new ActivityDTO()
            {
                id = 1,
                name = "Teste",
                difficulty = DifficultyEnum.Easy,

            };
            var listOfActivities = new List<ActivityDTO>();
            listOfActivities.Add(activity);
            return Ok(listOfActivities);
        }

        [HttpPost]
        public JsonResult CreateActivity (ActivityDTO activityToCreate)   // TODO: Criar interface e classe de objeto a manipular
        {
            try
            {
                return rules.CreateActivity(activityToCreate);
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
                return rules.DeleteActivity(idToDelete);
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
                return rules.UpdateActivity(activityToUpdate);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}