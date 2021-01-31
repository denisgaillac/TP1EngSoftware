using System;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.BusinessRules;
using StudySmart.Models.Data;

namespace StudySmart.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly Context context;
        private readonly ClassRules _rules;

        public ClassController(Context ContextDB){
            context = ContextDB;
           _rules = new ClassRules(context);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_rules.GetClasses());
        }
        [HttpPost("[Action]")]
        public IActionResult CreateClass ([FromBody] ClassDTO activityToCreate)
        {
            try
            {
                return Ok(_rules.CreateClass(activityToCreate));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("[Action]/{idToDelete}")]
        public IActionResult DeleteClass (int idToDelete)
        {
            try
            {
                return Ok(_rules.DeleteClass(idToDelete));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPatch("[Action]")]
        public IActionResult UpdateClass ([FromBody] ClassDTO activityToUpdate)
        {
            try
            {
                return Ok(_rules.UpdateClass(activityToUpdate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}