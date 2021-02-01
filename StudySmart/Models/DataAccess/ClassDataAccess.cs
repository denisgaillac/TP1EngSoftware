using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.Data;
using StudySmart.Models.DataEntities;

namespace StudySmart.Models.DataAccess
{
    public class ClassDataAccess
    {
        private readonly Context context;
        public ClassDataAccess(Context contextDB)
        {
            context = contextDB;
        }
        public List<ClassDTO> GetClasses()
        {
            return context.ClassesDB.Select(x => new ClassDTO(){
                Id = x.IdClass,
                Name = x.ClassName,
            }).ToList();
        }
        public ClassDTO CreateClass(ClassDTO classToCreate)
        {
            var newClass = new Classes(){
                IdClass = classToCreate.Id,
                ClassName = classToCreate.Name,
            };
            var entityEntry = context.ClassesDB.Add(newClass);
            context.SaveChanges();
            classToCreate.Id = entityEntry.Entity.IdClass;
            return classToCreate;
        }
        public ClassDTO UpdateClass(ClassDTO classToUpdate)
        {
            var ClassToUpdate = new Classes(){
                IdClass = classToUpdate.Id,
                ClassName = classToUpdate.Name,
            };
            context.ClassesDB.Update(ClassToUpdate);
            context.SaveChanges();
            return classToUpdate;
        }

        public string DeleteClass(int idToDelete){
            var ClassToDelete = context.ClassesDB.Where(x => x.IdClass == idToDelete).FirstOrDefault();
            if(ClassToDelete != null){
                context.ClassesDB.Remove(ClassToDelete);
                context.SaveChanges();
                return "Matéria excluída com sucesso!";
            }
            throw new Exception("Ocorreu um erro ao excluir a Matéria.");
        }

    }
}