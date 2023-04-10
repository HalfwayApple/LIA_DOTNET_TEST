using LIA_DOTNET_TEST.Data;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Text.Json;

namespace LIA_DOTNET_TEST.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {

        readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
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

        [HttpPost]
        public ActionResult<ICollection<Booking>> CreateBooking ([FromBody] InputBookingModel inputModel)
        {
			TimeSlot timeSlot = new TimeSlot()
            {
                StartTime = TimeSpan.Parse(inputModel.StartTime),
                EndTime = TimeSpan.Parse(inputModel.EndTime)
            };

			User user = new User()
            {
                Name = "Cean Sonnery"
            };

			try
			{
                Booking booking = _bookingRepository.CreateBooking(inputModel.Day, user, timeSlot);

				return Ok(booking);
			}
			catch (Exception exception)
			{

				return BadRequest(new { exception.Message });
			}
		}
    }
}