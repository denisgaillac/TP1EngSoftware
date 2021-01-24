using Microsoft.AspNetCore.Mvc;

namespace StudySmart.Models.Interfaces
{
    public interface IClass
    {
        JsonResult CreateClass(IClass ClassToCreate);
        JsonResult UpdateClass (IClass ClassToUpdate);
        JsonResult DeleteClass(int id);
    }
}