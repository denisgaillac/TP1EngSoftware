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

        private int calculatePoints(List<ActivityDTO> activities)
        {
            int points = 0;
            foreach (var activity in activities)
            {
                int activityPoints = (int) activity.difficulty + 1;
                points = points + activityPoints;
            }
            return points;
        }

        public List<PerformanceDTO> Filter(FilterDTO filter)
        {
            List<ActivityDTO> activities = DataAccess.Filter(filter);

            var performance = new List<PerformanceDTO>();

            var currentDate = initialDate;
            while(currentDate < finalDate)
            {
                var idealConcludedActivities = activities.Where(act => act.expirationDate == currentDate).ToList();
                var idealValue = calculatePoints(idealConcludedActivities);

                var realConcludedActivities = activities.Where(act => act.conclusionDate == currentDate).ToList();
                var realValue = calculatePoints(realConcludedActivities);

                var dayPerformance = new PerformanceDTO() {
                    idealValue = idealValue,
                    realValue = realValue,
                    date = currentDate.Date,
                };
                performance.Add(dayPerformance);

                currentDate = currentDate.AddDays(1);
            }

            return performance;
        }

    }
}