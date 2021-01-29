using System;
using System.Collections.Generic;
using StudySmart.Models.DataEntities;

namespace StudySmart.Models.DataEntities
{
    public class Classes
    {
        public int IdClass {get; set; }
        public string ClassName{ get; set; }
        public List<Activities> ClassActivities {get; set;}
    }
}