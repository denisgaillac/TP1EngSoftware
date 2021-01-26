using StudySmart.Models.DTOs.Enums;

namespace StudySmart.Models.DTOs
{
    public class FilterDTO
    {
        public FilterTypeEnum Type {get; set; }
        public string campo { get; set; }
        public object arg {get; set; }
    }
}