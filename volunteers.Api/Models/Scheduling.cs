namespace volunteers.Api.Models
{
    public class Scheduling
    {
        public int?[] favoriteVolunteers { get; set; }
        public Scheduling()
        {
            this.favoriteVolunteers = new int?[5];
            
        }

    }
}
