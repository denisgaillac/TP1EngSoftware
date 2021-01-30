using StudySmart.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace StudySmart.Models.Interfaces
{
    public interface IActivityRules
    {
        ActivityDTO CreateActivity(ActivityDTO activity);
        ActivityDTO UpdateActivity (ActivityDTO activity);
        JsonResult DeleteActivity(int id);
        List<ActivityDTO> GetActivities();
        List<ActivityDTO> FilterActivities(FilterDTO filter);
    }
}