using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.Interfaces;
using StudySmart.Models.DTOs.Enums;

namespace StudySmart.Controllers
{
    public class ActivitiesController : Controller
    {
        private readonly IActivityRules rules;

        public ActivitiesController(IActivityRules activityRules){
            rules = activityRules;
        }

        [HttpPost]
        public IActionResult Index() // Read 
        {
            return View();
        }

        public List<ActivityDTO> Filter(FilterDTO filter){
            var activity = new ActivityDTO()
            {
                id = 1,
                name = "Teste",
                difficulty = DifficultyEnum.Easy,

            };
            var listOfActivities = new List<ActivityDTO>();
            listOfActivities.Add(activity);
            return listOfActivities;
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