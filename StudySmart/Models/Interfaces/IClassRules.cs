using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;

namespace StudySmart.Models.Interfaces
{
    public interface IClassRules
    {
        JsonResult CreateClass(ClassDTO ClassToCreate);
        JsonResult UpdateClass (ClassDTO ClassToUpdate);
        JsonResult DeleteClass(int id);
    }
}