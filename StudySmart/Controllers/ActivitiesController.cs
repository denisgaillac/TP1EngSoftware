using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudySmart.Models;

namespace StudySmart.Controllers
{
    public class ActivitiesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public void CreateActivity ()   // TODO: Criar interface e classe de objeto a manipular
        {
            try
            {

            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void DeleteActivity ()
        {
            try
            {

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void UpdateActivity ()
        {
            try
            {

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}