namespace volunteers.Api.Models
{
    public class Volunteer
    {
        enum Days
        {
            Sunday, Monday, Tuesday, Wednesday, Thursday
        }
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string? phone{ get; set; }
        public int numOfPlaces { get; set; }
        public bool[] chosenDays { get; set; }

        public Volunteer()
        {
            chosenDays = new bool[5];
            chosenDays[0] = false;
            chosenDays[1] = false;
            chosenDays[2] = false;
            chosenDays[3] = false;
            chosenDays[4] = false;

        }
        

    }
}
