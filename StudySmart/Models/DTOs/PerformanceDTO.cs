using System;

namespace StudySmart.Models.DTOs
{
    public class PerformanceDTO
    {
        public int idealValue { get; set; }
        public int realValue { get; set; }
        public DateTime date { get; set; }
    }
}