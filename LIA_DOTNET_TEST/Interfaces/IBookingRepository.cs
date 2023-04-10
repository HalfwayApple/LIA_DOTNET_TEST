using LIA_DOTNET_TEST.Models;

namespace LIA_DOTNET_TEST.Interfaces
{
    public interface IBookingRepository
    {
        public ICollection<Booking> GetAllBookings();
        public ICollection<TimeSlot> GetAllTimeSlots();

        // Add AddBooking
        public Booking CreateBooking(int day, User user, TimeSlot timeSlot);
    }
}
