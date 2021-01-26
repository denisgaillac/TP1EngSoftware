using System;
using StudySmart.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace StudySmart.Models.DTOs
{
    public class ClassDTO : IClass
    {
        private int Id {get; set; }
        private string Name {get; set; }

        public JsonResult CreateClass (IClass ClassToCreate)
        {
            return new JsonResult("");
        }
        public JsonResult UpdateClass (IClass ClassToUpdate)
        {
            return new JsonResult("");
        }
        public JsonResult DeleteClass (int IdToDelete)
        {
            return new JsonResult("");
        }
    }
}