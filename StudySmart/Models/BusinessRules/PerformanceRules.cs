using System;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using StudySmart.Models.Interfaces;
using StudySmart.Models.DataAccess;
using StudySmart.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;

namespace StudySmart.Models.BusinessRules
{
    public class PerformanceRules
    {
        private ActivityDataAccess DataAccess;
        public PerformanceRules(Context contextDB) 
        {
            DataAccess = new ActivityDataAccess(contextDB);
        }

        private int GetPointsByDay(List<ActivityDTO> activities)
        {
            //int points = 0;
            return activities.Sum(a=> ((int)a.difficulty+1));
            // foreach (var activity in activities)
            // {
            //     int activityPoints = (int) activity.difficulty + 1;
            //     points = points + activityPoints;
            // }
            // return points;
        }

        public List<PerformanceDTO> Filter(FilterPerformanceDTO filter)
        {
            List<ActivityDTO> activities = DataAccess.Filter(filter);

            var performanceList = new List<PerformanceDTO>();

            var dayAvailable = filter.initialDate;
            while(dayAvailable < filter.finalDate)
            {
                var idealConcludedActivities = activities
                .Where(a => a.expirationDate.Date == dayAvailable.Date).ToList();

                var realConcludedActivities = activities
                .Where(a => a.conclusionDate >= dayAvailable.Date 
                    && a.conclusionDate < dayAvailable.Date.AddDays(1)).ToList();

                performanceList.Add(
                    new PerformanceDTO() {
                        idealValue = GetPointsByDay(idealConcludedActivities),
                        realValue = GetPointsByDay(realConcludedActivities),
                        date = dayAvailable.Date,
                    });

                dayAvailable = dayAvailable.AddDays(1);
            }

            return performanceList;
        }

    }
}