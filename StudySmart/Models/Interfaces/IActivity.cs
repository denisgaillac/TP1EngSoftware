using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace StudySmart.Models.Interfaces
{
    public interface IActivity
    {
        JsonResult DeleteActivity(int id);
        JsonResult CreateActivity(IActivity activity);
        JsonResult UpdateActivity (IActivity activity);
    }
}