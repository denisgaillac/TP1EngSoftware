using System;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using StudySmart.Models.Interfaces;
using StudySmart.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace StudySmart.Models.BusinessRules
{
    public class ActivityRules : IActivityRules
    {
        private readonly Context context;
        public ActivityRules(Context contextDB) 
        {
            context = contextDB;
        }

        public List<ActivityDTO> FilterActivities()
        {
            var activities = context.ActivitiesDB.Select(x => new ActivityDTO{
                id = x.IdActivity,
                name = x.NameActivity,
                difficulty = x.Difficulty,
                doneStatus = x.statusActivity,
                conclusionStatus = x.StatusConclusionDate,
                conclusionDate = x.ConclusionDate,
                expirationDate = x.ExpirationDate,
                idClass = x.IdClass
            }).ToList();
            return activities;
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
                    IdClass = activityToCreate.idClass,
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