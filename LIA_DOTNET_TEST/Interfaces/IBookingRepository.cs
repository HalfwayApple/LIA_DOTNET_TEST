using LIA_DOTNET_TEST.Models;

namespace LIA_DOTNET_TEST.Interfaces
{
    public interface IBookingRepository
    {
        public ICollection<Booking> GetAllBookings();
        public ICollection<TimeSlot> GetAllTimeSlots();
        public Booking CreateBooking(int day, User user, TimeSlot timeSlot);
		public void DeleteBookingById(int id);
		ICollection<User> GetAllUsers();
	}
}
