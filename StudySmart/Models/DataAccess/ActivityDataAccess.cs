using System.Collections.Generic;
using StudySmart.Models.DTOs;
using StudySmart.Models.DataEntities;
using System.Data.Entity;

namespace StudySmart.Models.DataAccess
{
    public class ActivityDatAccess
    {
        private static string Host = "127.0.0.1";
        private static string User = "postgresql";
        private static string DBname = "StudySmartDB";
        // private static string Password = "Raimundos1!";
        private static string Port = "22065";

        public List<ActivityDTO> Filter(FilterDTO filter)
        {
            return new List<ActivityDTO>();
        }
    }
}