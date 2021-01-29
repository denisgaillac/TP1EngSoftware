using System;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using StudySmart.Models.Interfaces;
using StudySmart.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StudySmart.Models.BusinessRules
{
    public class ActivityRules : IActivityRules
    {
        public ActivityRules(Context context) 
        {
            this.context = context;
               
        }
        private Context context { get; set; }

        // public ActivityRules(Context contextDB){
        //     context = contextDB;
        // }
        public List<ActivityDTO> FilterActivities(FilterDTO filter)
        {
            return new List<ActivityDTO>();
            //return ActivityDataAccess;
        }
        public JsonResult CreateActivity(ActivityDTO activityToCreate)
        {
            try
            {
                var activity = new Activities(){
                    NameActivity = activityToCreate.name,
                    Difficulty = activityToCreate.difficulty,
                    statusActivity = activityToCreate.doneStatus,
                    StatusConclusionDate = activityToCreate.conclusionStatus,
                    ExpirationDate = activityToCreate.expirationDate,
                    ConclusionDate = activityToCreate.conclusionDate,
                    IdClass = 1
                };
                context.ActivitiesDB.Add(activity);
                context.SaveChanges();
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
            return new JsonResult("Sucesso!!");
        }
        public JsonResult UpdateActivity(ActivityDTO activityToUpdate){
            return new JsonResult("");
        }
        public JsonResult DeleteActivity(int idToDelete){
            return new JsonResult("");
        }
    }
}