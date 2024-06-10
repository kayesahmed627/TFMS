using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using TFMS.Lib.Models;

namespace TFMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PavilionsController : ControllerBase
    {
        private readonly FairDbContext db;

        public PavilionsController(FairDbContext context)
        {
            db = context;
        }

        // GET: api/Pavilions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pavilion>>> GetPavilions()
        {
            return await db.Pavilions.ToListAsync();
        }
        [HttpGet("NotBooked/Include")]
        public async Task<ActionResult<IEnumerable<Pavilion>>> GetPavilionsWithBookings()
        {
            var data =await db.Pavilions.FromSqlRaw("Select * from Pavilions Where Pavilions.PavilionId NOT IN (Select Bookings.PavilionId From Bookings)").ToListAsync();
            return data;
            //List<Pavilion> m = new List<Pavilion>();
            //var x= db.Bookings.ToList();
            //foreach (var item in x)
            //{

            //    var data =await  db.Pavilions.Where(y => y.PavilionId == item.PavilionId).ToListAsync();


            //}
            //return m;

            
        }


        // GET: api/Pavilions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pavilion>> GetPavilion(int id)
        {
            var pavilion = await db.Pavilions.FindAsync(id);

            if (pavilion == null)
            {
                return NotFound();
            }

            return pavilion;
        }

        // PUT: api/Pavilions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPavilion(int id, Pavilion pavilion)
        {
            if (id != pavilion.PavilionId)
            {
                return BadRequest();
            }

            db.Entry(pavilion).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PavilionExists(id))
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

        // POST: api/Pavilions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pavilion>> PostPavilion(Pavilion pavilion)
        {
            db.Pavilions.Add(pavilion);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetPavilion", new { id = pavilion.PavilionId }, pavilion);
        }

        // DELETE: api/Pavilions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePavilion(int id)
        {
            var pavilion = await db.Pavilions.FindAsync(id);
            if (pavilion == null)
            {
                return NotFound();
            }

            db.Pavilions.Remove(pavilion);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool PavilionExists(int id)
        {
            return db.Pavilions.Any(e => e.PavilionId == id);
        }
    }
}
