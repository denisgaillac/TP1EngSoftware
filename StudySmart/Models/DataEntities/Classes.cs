using System.ComponentModel.DataAnnotations.Schema;

namespace StudySmart.Models.DataEntities
{
    [Table("CLASSES")]
    public class Classes
    {
        [Column("ID_CLASS")]
        public int Id {get; set; }
        [Column("CLASS_NAME")]
        public string ClassName{ get; set; }
    }
}