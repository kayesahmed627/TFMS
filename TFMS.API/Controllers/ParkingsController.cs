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
    public class ParkingsController : ControllerBase
    {
        private readonly FairDbContext db;

        public ParkingsController(FairDbContext context)
        {
            db = context;
        }

        // GET: api/Parkings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parking>>> GetParkings()
        {
            return await db.Parkings
                .Include(x => x.Visitor)
                .ToListAsync();
        }

        // GET: api/Parkings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parking>> GetParking(int id)
        {
            var parking = await db.Parkings.FindAsync(id);

            if (parking == null)
            {
                return NotFound();
            }

            return parking;
        }

        // PUT: api/Parkings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParking(int id, Parking parking)
        {
            if (id != parking.ParkingId)
            {
                return BadRequest();
            }
            db.Entry(parking).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingExists(id))
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

        // POST: api/Parkings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parking>> PostParking(Parking parking)
        {
            db.Parkings.Add(parking);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetParking", new { id = parking.ParkingId }, parking);
        }

        // DELETE: api/Parkings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParking(int id)
        {
            var parking = await db.Parkings.FindAsync(id);
            if (parking == null)
            {
                return NotFound();
            }

            db.Parkings.Remove(parking);
            await db.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("DTO/{id}")]
        public async Task<ActionResult<IEnumerable<VisitorParkingDTO>>> GetVisitorParkingDtos()
        {
            var parking = await db.Parkings
                .Include(x => x.Visitor)
                .ToListAsync();
            var data = parking.Select(x => new VisitorParkingDTO
            {
                ParkingId = x.ParkingId,
                VehicleType = x.VehicleType,
                NumberPlate = x.NumberPlate,
                ParkingDate = x.ParkingDate,
                CheckInTime = x.CheckInTime,
                CheckOutTime = x.CheckOutTime,
                Token = x.Token,
                ParkingFare = x.ParkingFare,
                VisitorId = x.VisitorId,
                VisitorName = x.Visitor?.VisitorName ?? string.Empty,
            }).ToList();
            return data;
        }

        [HttpGet("Options/VehicleType")]
        public async Task<IEnumerable<VehicleTypeOption>> GetVehicleTypeOption()
        {
            string[] names = Enum.GetNames(typeof(VehicleType));
            List<VehicleTypeOption> result = new List<VehicleTypeOption>();
            await Task.Run(() =>
            {
                foreach (string name in names)
                {
                    VehicleType v = (VehicleType)Enum.Parse(typeof(VehicleType), name);
                    result.Add(new VehicleTypeOption { Text = name, Value = (int)v });
                }

            });
            return result.ToList();
        }

        private bool ParkingExists(int id)
        {
            return db.Parkings.Any(e => e.ParkingId == id);
        }
    }
}
