using System;
using StudySmart.Models.DTOs.Enums;

namespace StudySmart.Models.DTOs
{
    public class ActivityDTO
    {
        public int id {get; set; }
        public string name {get; set; }
        public DifficultyEnum difficulty {get; set; }
        public DoneStatusEnum doneStatus {get; set; }
        public bool? conclusionStatus {get; set; }
        public DateTime expirationDate {get; set; }
        public DateTime conclusionDate {get; set; }
        public int idClass { get; set; }

        public ClassDTO classOfActivity {get; set; }
    }
}