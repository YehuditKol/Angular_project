using Microsoft.AspNetCore.Mvc;
using volunteers.Api.Models;

namespace volunteers.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VolunteersController : ControllerBase
    {
        static List<Volunteer> volunteers { get; set; }

        static VolunteersController() => volunteers = new List<Volunteer>
        {
        new Volunteer(){ Id=1,firstName="yehuda",lastName="choen",phone="052-7658941",numOfPlaces=6 },
        new Volunteer(){ Id=2,firstName="roni",lastName="shapira",phone="052-7156854",numOfPlaces=4 },
        new Volunteer(){ Id=3,firstName="nachman",lastName="meuman",phone="054-8597563",numOfPlaces=2 },
        new Volunteer(){Id=4,firstName="shimshon",lastName="look",phone="055-6721368",numOfPlaces=7 },
         new Volunteer(){Id=5,firstName="leizer",lastName="avramov",phone="050-4198567",numOfPlaces=9 }
        };
        [HttpGet]
        public Volunteer[] Get()
        {
            var size = volunteers.Count();
            Volunteer[] v = new Volunteer[size];
            int i = 0;
            foreach (var vol in volunteers)
            {
                v[i++] = vol;
            }
            return v;
        }

        [HttpGet("{id}")]
        public Volunteer? GetById(int id)
        {
            foreach (var v in volunteers)
            {
                if (v.Id == id)
                {
                    return v;
                }
            }
            return null;
        }

        //[HttpPost("{idp}/{firstNamep}/{addresp}/{fonep}/{activep}/{avgMarkp}")]
        //public List<Student> Post(int idp, string firstNamep, string lastNamep, string addresp, string fonep, bool activep, int avgMarkp)
        //{
        //    Student s = new Student() { id = idp, firstName = firstNamep, addres = addresp, fone = fonep, active = activep, avgMark = avgMarkp };
        //    students.Add(s);
        //    return students;
        //}

        [HttpPut("{id}")]
        public ActionResult Put(int id,Volunteer volunteer)
        {
            var index=volunteers.FindIndex(volunteer=>volunteer.Id == id);
            if (index != -1)
            {
                volunteers[index].Id=volunteer.Id;
                volunteers[index].firstName = volunteer.firstName;
                volunteers[index].lastName = volunteer.lastName;
                volunteers[index].numOfPlaces=volunteer.numOfPlaces;
                volunteers[index].phone = volunteer.phone;
                for(int i = 0; i < volunteer.chosenDays.Length; i++)
                {
                    volunteers[index].chosenDays[i]=volunteer.chosenDays[i];
                }
                return Ok(volunteers);
            }
            
            return NotFound();
        }

        [HttpDelete("{id}")]
        public ActionResult<List<Volunteer>> Delete(int id)
        {
            foreach (var v in volunteers)
            {
                if (v.Id == id)
                {
                    volunteers.Remove(v);
                    return volunteers;
                }
            }
            return NotFound();
        }

    }
}
