using System;
using StudySmart.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace StudySmart.Models.DTOs
{
    public class ClassDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}