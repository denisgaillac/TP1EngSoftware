using StudySmart.Models.DTOs;
using StudySmart.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace StudySmart.Models.BusinessRules
{
    public class ClassRules: IClassRules
    {
        public JsonResult CreateClass (ClassDTO ClassToCreate)
        {
            return new JsonResult("");
        }
        public JsonResult UpdateClass (ClassDTO ClassToUpdate)
        {
            return new JsonResult("");
        }
        public JsonResult DeleteClass (int IdToDelete)
        {
            return new JsonResult("");
        }
    }
}