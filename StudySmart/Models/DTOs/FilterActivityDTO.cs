using System;

namespace StudySmart.Models.DTOs
{
    public class FilterActivityDTO
    {
        public int? id { get; set; }
        public int? idClass { get; set; } 
        public DateTime? conclusionDate { get; set; }
        public DateTime? expirationDate { get; set; }

    }
}