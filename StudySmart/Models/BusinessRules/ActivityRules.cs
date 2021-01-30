using System;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using StudySmart.Models.Interfaces;
using StudySmart.Models.DataAccess;
using StudySmart.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StudySmart.Models.BusinessRules
{
    public class ActivityRules : IActivityRules
    {
        private ActivityDataAccess DataAccess;
        public ActivityRules(Context contextDB) 
        {
            DataAccess = new ActivityDataAccess(contextDB);
        }
        public List<ActivityDTO> GetActivities()
        {
            return DataAccess.GetActivities();
        }
        public List<ActivityDTO> FilterActivities(FilterDTO filter)
        {
            return new List<ActivityDTO>();
        }
        public ActivityDTO CreateActivity(ActivityDTO activityToCreate)
        {
            try
            {
                return DataAccess.CreateActivity(activityToCreate);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public ActivityDTO UpdateActivity(ActivityDTO activityToUpdate)
        {
            try
            {
                return DataAccess.UpdateActivity(activityToUpdate);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public JsonResult DeleteActivity(int idToDelete)
        {
            return new JsonResult(DataAccess.DeleteActivity(idToDelete));
        }
    }
}