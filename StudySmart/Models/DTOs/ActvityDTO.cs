using System;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.Interfaces;

namespace StudySmart.Models.DTOs
{
    public class ActvityDTO : IActivity
    {
        private int id {get; set; }
        private string NameActivity {get; set; }
        private int Dificulty {get; set; }
        private bool? status_activity {get; set; }
        private bool? StatusConclusionDate {get; set; }
        private DateTime ExpirationDate {get; set; }
        private DateTime ConclusionDate {get; set; }
        private int IdClass { get; set; }

        private ClassDTO Class {get; set;}

        public JsonResult CreateActivity(IActivity acitvityToCreate){
            return new JsonResult("");
        }
        public JsonResult UpdateActivity(IActivity acitvityToUpdate){
            return new JsonResult("");
        }
        public JsonResult DeleteActivity(int idToDelete){
            return new JsonResult("");
        }

    }
}