using LIA_DOTNET_TEST.Database;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace LIA_DOTNET_TEST.Repository
{
    public class BookingRepository : IBookingRepository
    {
        public void Seed()
        {
            using Context context = new();

            ICollection<TimeSlot> timeSlots = ProduceTimeSlots();

            TimeSlot timeSlot = timeSlots.FirstOrDefault();

            ICollection<Booking> bookings = ProduceTestBooking(timeSlot);


            context.TimeSlots.AddRange(timeSlots);
            context.Bookings.AddRange(bookings);

            context.SaveChanges();
        }

        public ICollection<Booking> GetAllBookings()
        {
            using Context context = new();
            return context.Bookings.Include(ts => ts.User).Include(ts => ts.TimeSlot).ToList();
        }

        public ICollection<TimeSlot> GetAllTimeSlots()
        {
            using Context context = new();
            return context.TimeSlots.ToList();
        }

		public Booking CreateBooking(int day, User user, TimeSlot timeSlot)
		{
            using Context context = new();

            Booking booking = new()
            {
                Day = day,
                User = user,
                TimeSlot = timeSlot
            };

            context.Bookings.Add(booking);
            context.SaveChanges();

            return booking;
		}

		private static ICollection<TimeSlot> ProduceTimeSlots()
        {
            return new List<TimeSlot>()
                {
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(9, 0,0),
                         EndTime = new TimeSpan(12, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(12, 0,0),
                         EndTime = new TimeSpan(14, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(14, 0,0),
                         EndTime = new TimeSpan(16, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(16, 0,0),
                         EndTime = new TimeSpan(20, 0,0),
                    },
                   
                };
        }

        private static ICollection<Booking> ProduceTestBooking(TimeSlot timeSlot)
        {
            return new List<Booking>()
            {
                new Booking()
                {
                    Day = 1,
                    User = new User()
                    {
                        Name = "Sean Connery"
                    },
                    TimeSlot = timeSlot
                }
            };
        }
	}
}
