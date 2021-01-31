using StudySmart.Models.DTOs;
using StudySmart.Models.Interfaces;
using StudySmart.Models.Data;
using StudySmart.Models.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace StudySmart.Models.BusinessRules
{
    public class ClassRules: IClassRules
    {
        private ClassDataAccess DataAccess;
        public ClassRules(Context contextDB) 
        {
            DataAccess = new ClassDataAccess(contextDB);
        }
        public List<ClassDTO> GetClasses()
        {
            return DataAccess.GetClasses();
        }
        public List<ClassDTO> FilterClass(FilterActivityDTO filter)
        {
            return new List<ClassDTO>();
        }
        public ClassDTO CreateClass(ClassDTO activityToCreate)
        {
            try
            {
                return DataAccess.CreateClass(activityToCreate);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public ClassDTO UpdateClass(ClassDTO activityToUpdate)
        {
            try
            {
                return DataAccess.UpdateClass(activityToUpdate);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public JsonResult DeleteClass(int idToDelete)
        {
            return new JsonResult(DataAccess.DeleteClass(idToDelete));
        }
    }
}