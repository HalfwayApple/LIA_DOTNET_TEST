using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;

namespace LIA_DOTNET_TEST.Services
{
	public class BookingService
	{
		readonly IBookingRepository _bookingRepository;

		public BookingService(IBookingRepository bookingRepository)
		{
			_bookingRepository = bookingRepository;
		}

		public Booking CreateBooking(int day, string startTime, string endTime, User user)
		{
			TimeSlot timeSlot = new TimeSlot()
			{
				StartTime = TimeSpan.Parse(startTime),
				EndTime = TimeSpan.Parse(endTime)
			};

			Booking booking = _bookingRepository.CreateBooking(day, user, timeSlot);

			return booking;
		}
	}
}
