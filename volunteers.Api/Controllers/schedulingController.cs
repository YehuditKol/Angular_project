using Microsoft.AspNetCore.Mvc;
using volunteers.Api.Models;

namespace volunteers.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class schedulingController : ControllerBase
    {
        static Scheduling scheduling = new Scheduling();
        [HttpGet]
        public Scheduling Get()
        {
            return scheduling;
        }
        [HttpPut]
        public ActionResult Put(int[] arrPut)
        {
           
                for (int i = 0; i < scheduling.favoriteVolunteers.Length; i++)
                {
                scheduling.favoriteVolunteers[i] = arrPut[i];
                }
                return Ok(scheduling.favoriteVolunteers);
            

            return NotFound();
        }

    }
}
