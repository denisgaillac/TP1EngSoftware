using System;
using StudySmart.Models.DTOs.Enums;

namespace StudySmart.Models.DTOs
{
    public class FilterPerformanceDTO
    {
        public DateTime initialDate {get; set; }
        public DateTime finalDate { get; set; }
        public int? idClass {get; set; }
    }
}