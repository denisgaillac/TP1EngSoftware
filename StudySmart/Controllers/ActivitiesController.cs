using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models;

namespace StudySmart.Controllers
{
    public class ActivitiesController : Controller
    {
        [HttpPost]
        public IActionResult Index() // Read 
        {
            return View();
        }
    
        [HttpPost]
        public JsonResult CreateActivity ()   // TODO: Criar interface e classe de objeto a manipular
        {
            try
            {
                return new JsonResult("");
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public JsonResult DeleteActivity ()
        {
            try
            {
                return new JsonResult("");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public JsonResult UpdateActivity ()
        {
            try
            {
                return new JsonResult("");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}