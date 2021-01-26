using StudySmart.Models.DTOs;
using StudySmart.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StudySmart.Models.BusinessRules
{
    public class ActivityRules : IActivityRules
    {
        public List<ActivityDTO> FilterActivities(FilterDTO filter)
        {
            return new List<ActivityDTO>();
            //return ActivityDataAccess;
        }
        public JsonResult CreateActivity(ActivityDTO activityToCreate){

            return new JsonResult("");
        }
        public JsonResult UpdateActivity(ActivityDTO activityToUpdate){
            return new JsonResult("");
        }
        public JsonResult DeleteActivity(int idToDelete){
            return new JsonResult("");
        }
    }
}