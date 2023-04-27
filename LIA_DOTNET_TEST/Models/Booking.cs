using System.ComponentModel.DataAnnotations;

namespace LIA_DOTNET_TEST.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public int Day { get; set; }
        public TimeSlot? TimeSlot { get; set; }
        public User? User { get; set; }
    }
}
