using System.Collections.Generic;
using System.Linq;
using StudySmart.Models.DTOs;
using StudySmart.Models.Data;
using StudySmart.Models.DataEntities;
using System;
using Microsoft.EntityFrameworkCore;

namespace StudySmart.Models.DataAccess
{
    public class ActivityDataAccess
    {
        private readonly Context context;
        public ActivityDataAccess(Context contextDB)
        {
            context = contextDB;
        }
        public List<ActivityDTO> Filter(FilterPerformanceDTO filter)
        {  
            var query = context.ActivitiesDB
            .Where(x => x.ExpirationDate.Date >= filter.initialDate.Date 
                && x.ExpirationDate.Date <= filter.finalDate.Date);
            
            if(filter.idClass != null)
            {
                query.Where(x => x.IdClass == filter.idClass);
            }

            return query.Select(x => 
                new ActivityDTO(){
                    id = x.IdActivity,
                    name = x.NameActivity,
                    difficulty = x.Difficulty,
                    doneStatus = x.statusActivity,
                    conclusionStatus = x.StatusConclusionDate,
                    conclusionDate = x.ConclusionDate,
                    expirationDate = x.ExpirationDate,
                    idClass = x.IdClass
                }).ToList();
        }
        public List<ActivityDTO> GetActivities()
        {
            return context.ActivitiesDB.Include(x => x.Class)
                .Select(x => new ActivityDTO(){
                    id = x.IdActivity,
                    name = x.NameActivity,
                    difficulty = x.Difficulty,
                    doneStatus = x.statusActivity,
                    conclusionStatus = x.StatusConclusionDate,
                    conclusionDate = x.ConclusionDate,
                    expirationDate = x.ExpirationDate,
                    idClass = x.IdClass,
                    
                    classOfActivity = new ClassDTO(){
                        Name = x.Class.ClassName,
                        Id = x.IdClass
                    }
                }).ToList();
        }
        public ActivityDTO CreateActivity(ActivityDTO activityToCreate)
        {
            var activity = new Activities(){
                NameActivity = activityToCreate.name,
                Difficulty = activityToCreate.difficulty,
                statusActivity = activityToCreate.doneStatus,
                StatusConclusionDate = activityToCreate.conclusionStatus,
                ExpirationDate = activityToCreate.expirationDate,
                ConclusionDate = activityToCreate.conclusionDate,
                IdClass = activityToCreate.idClass
            };
            var entityEntry = context.ActivitiesDB.Add(activity);
            context.SaveChanges();
            activityToCreate.id = entityEntry.Entity.IdActivity;
            return activityToCreate;
        }
        public ActivityDTO UpdateActivity(ActivityDTO activityToUpdate)
        {
            var activity = new Activities(){
                IdActivity = activityToUpdate.id,
                NameActivity = activityToUpdate.name,
                Difficulty = activityToUpdate.difficulty,
                statusActivity = activityToUpdate.doneStatus,
                StatusConclusionDate = activityToUpdate.conclusionStatus,
                ExpirationDate = activityToUpdate.expirationDate,
                ConclusionDate = activityToUpdate.conclusionDate,
                IdClass = activityToUpdate.idClass
            };
            context.ActivitiesDB.Update(activity);
            context.SaveChanges();
            return activityToUpdate;
        }

        public string DeleteActivity(int idToDelete){
            var activity = context.ActivitiesDB.Where(x => x.IdActivity == idToDelete).FirstOrDefault();
            if(activity != null){
                context.ActivitiesDB.Remove(activity);
                context.SaveChanges();
                return "Atividade excluída com sucesso!";
            }
            throw new Exception("Ocorreu um erro ao excluir a atividade.");
        }

    }
}