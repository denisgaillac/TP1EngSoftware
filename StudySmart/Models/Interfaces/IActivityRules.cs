using StudySmart.Models.DTOs;
using Microsoft.AspNetCore.Mvc;


namespace StudySmart.Models.Interfaces
{
    public interface IActivityRules
    {
        JsonResult DeleteActivity(int id);
        JsonResult CreateActivity(ActivityDTO activity);
        JsonResult UpdateActivity (ActivityDTO activity);
    }
}