using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using System.Collections.Generic;

namespace StudySmart.Models.Interfaces
{
    public interface IClassRules
    {
        ClassDTO CreateClass(ClassDTO activity);
        ClassDTO UpdateClass (ClassDTO activity);
        JsonResult DeleteClass(int id);
        List<ClassDTO> GetClasses();
    }
}