﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TFMS.API.ViewModels;
using TFMS.Lib.Models;

namespace TFMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly FairDbContext db;

        public BookingsController(FairDbContext context)
        {
            db = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await db.Bookings 
                .Include(x => x.Exhibitor)
                 .Include(x => x.Pavilion)
              
                .ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await db.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            db.Entry(booking).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            db.Bookings.Add(booking);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await db.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.Bookings.Remove(booking);
            await db.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("DTO/{id}")]
        public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookingDtos()
        {
            var booking= await db.Bookings
                .Include(x=>x.Exhibitor)
                .Include(y=>y.Pavilion)
                .ToListAsync();
            var data = booking.Select(x => new BookingDTO
            {
                BookingId=x.BookingId,
                BookingDate=x.BookingDate,
                BookingAmount=x.BookingAmount,
                ExhibitorId=x.ExhibitorId,
                CompanyName=x.Exhibitor?.CompanyName??string.Empty,
                PavilionId=x.PavilionId,
                PavilionName=x.Pavilion?.PavilionName??string.Empty,
            }).ToList();
            return data;
        }
            private bool BookingExists(int id)
        {
            return db.Bookings.Any(e => e.BookingId == id);
        }
    }
}
