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



            ICollection<User> users = new List<User>();
            for (int i = 1; i < 6; i++)
            {
                User user = new User()
                {
                    Name = "User " + i.ToString()
                };
                users.Add(user);
            }
            context.Users.AddRange(users);



            context.TimeSlots.AddRange(timeSlots);
            context.Bookings.AddRange(bookings);

            context.SaveChanges();
        }

        public Booking GetBookingById(int id)
        {
            using Context context = new();
            return context.Bookings.FirstOrDefault(x => x.Id == id);
		}

		public ICollection<Booking> GetAllBookings()
        {
            using Context context = new();
            return context.Bookings.Include(ts => ts.User).Include(ts => ts.TimeSlot).ToList();
        }
		public ICollection<User> GetAllUsers()
		{
			using Context context = new();
			return context.Users.ToList();
		}

		public ICollection<TimeSlot> GetAllTimeSlots()
        {
            using Context context = new();
            return context.TimeSlots.ToList();
        }

		public Booking CreateBooking(int day, User user, TimeSlot timeSlot)
		{
            using Context context = new();

            context.Users.Attach(user);

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

		public void DeleteBookingById(int id)
		{
			using Context context = new();

            var booking = context.Bookings.FirstOrDefault(x => x.Id == id);

			context.Bookings.Remove(booking);
			context.SaveChanges();
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
