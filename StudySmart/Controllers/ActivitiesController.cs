using System;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models.DTOs;
using StudySmart.Models.BusinessRules;
using StudySmart.Models.Data;

namespace StudySmart.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly Context context;
        private readonly ActivityRules _activityRules;
        private readonly ClassRules _classRules;

        public ActivitiesController(Context ContextDB){
            context = ContextDB;
           _activityRules = new ActivityRules(context);
           _classRules = new ClassRules(context);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_activityRules.GetActivities());
        }

        [HttpPost("[Action]")]
        public IActionResult CreateActivity ([FromBody] ActivityDTO activityToCreate)
        {
            try
            {
                return Ok(_activityRules.CreateActivity(activityToCreate));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("[Action]/{idToDelete}")]
        public IActionResult DeleteActivity (int idToDelete)
        {
            try
            {
                return Ok(_activityRules.DeleteActivity(idToDelete));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("[Action]")]
        public IActionResult UpdateActivity (ActivityDTO activityToUpdate)
        {
            try
            {
                return Ok(_activityRules.UpdateActivity(activityToUpdate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("[Action]")]
        public IActionResult GetClasses ()
        {
            return Ok(_classRules.GetClasses());
        }
    }
}