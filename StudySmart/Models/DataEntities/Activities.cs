using System;
using System.Collections.Generic;
using StudySmart.Models.DTOs.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudySmart.Models.DataEntities
{
    public class Activities
    {
        public int IdActivity {get; set; }
        public string NameActivity {get; set; }
        public DifficultyEnum Difficulty {get; set; }
        public DoneStatusEnum statusActivity {get; set; }
        public bool? StatusConclusionDate {get; set; }
        public DateTime ExpirationDate {get; set; }
        public DateTime ConclusionDate {get; set; }
        public int IdClass { get; set; }
        public Classes Class {get; set; }
        
    }
}