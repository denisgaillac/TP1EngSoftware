using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudySmart.Models.DataEntities
{
    [Table("ACTIVITIES")]
    public class Activities
    {
        [Column("ID_ACTIVITY")]
        public int IdActivity {get; set; }
        [Column("NAME_ACTIVITY")]
        public string NameActivity {get; set; }
        [Column("DIFFICULTY")]
        public int Dificulty {get; set; }
        [Column("STATUS_ACTIVITY")]
        public bool? status_activity {get; set; }

        [Column("STATUS_CONCLUSION_DATE")]
        public bool? StatusConclusionDate {get; set; }
        [Column("EXPIRATION_DATE")]
        public DateTime ExpirationDate {get; set; }
        [Column("CONCLUSION_DATE")]
        public DateTime ConclusionDate {get; set; }
        [Column("ID_CLASS")]
        public int IdClass { get; set; }

        [ForeignKey("IdClass")]
        public Classes Class {get; set; }
        
    }
}