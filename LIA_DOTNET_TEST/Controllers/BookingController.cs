using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using LIA_DOTNET_TEST.Services;
using Microsoft.AspNetCore.Mvc;

namespace LIA_DOTNET_TEST.Controllers
{
	[ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {

        readonly IBookingRepository _bookingRepository;
        readonly BookingService _bookingService;

		public BookingController(IBookingRepository bookingRepository, BookingService bookingService)
		{
			_bookingRepository = bookingRepository;
			_bookingService = bookingService;
		}

		[HttpGet]
        public ActionResult<ICollection<Booking>> GetAll()
        {
            try
            {
                ICollection<Booking> bookings = _bookingRepository.GetAllBookings();

                return Ok(bookings);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }

        }

		[HttpDelete("{id}")]
		public ActionResult<Booking> DeleteBookingById(int id)
		{
			try
			{
				_bookingRepository.DeleteBookingById(id);

				return Ok();
			}
			catch (Exception exception)
			{
				return BadRequest(new { exception.Message });
			}
		}


		[HttpGet("timeslots")]
        public ActionResult<ICollection<TimeSlot>> GetTimeSlots()
        {
            try
            {
                ICollection<TimeSlot> timeSlots = _bookingRepository.GetAllTimeSlots();

                return Ok(timeSlots);
            }
            catch (Exception exception)
            {

                return BadRequest(new { exception.Message });
            }
        }

		[HttpGet("users")]
		public ActionResult<ICollection<TimeSlot>> GetUsers()
		{
			try
			{
				ICollection<User> users = _bookingRepository.GetAllUsers();

				return Ok(users);
			}
			catch (Exception exception)
			{

				return BadRequest(new { exception.Message });
			}
		}

		[HttpPost]
        public ActionResult<ICollection<Booking>> CreateBooking ([FromBody] InputBookingModel inputModel)
        {
			try
			{
                Booking booking = _bookingService.CreateBooking(inputModel.Day, inputModel.StartTime, inputModel.EndTime, inputModel.User);

				return Ok(booking);
			}
			catch (Exception exception)
			{
				return BadRequest(new { exception.Message });
			}
		}
    }
}