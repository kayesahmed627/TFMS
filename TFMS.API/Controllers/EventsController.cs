using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TFMS.Lib.Models;

namespace TFMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly FairDbContext db;

        public EventsController(FairDbContext context)
        {
            db = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await db.Events
            .Include(x => x.EventRegs)
                .ToListAsync();

        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await db.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }
        // GET: api/Events/5
        [HttpGet("{id}/Include")]
        public async Task<ActionResult<Event>> GetEventWithReg(int id)
        {
            var @event = await db.Events
                .Include(x => x.EventRegs)
                .FirstOrDefaultAsync(x => x.EventId == id);
            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }
        [HttpGet("EventReg/Of/{id}")]
        public async Task<ActionResult<IEnumerable<EventReg>>> GetEventRegOfEvent(int id)
        {
            var data = await db.EventsReg.Where(x => x.EventId == id).ToListAsync();
            return data;
        }
        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.EventId)
            {
                return BadRequest();
            }

            var p = await db.Events.FirstOrDefaultAsync(x => x.EventId == id);
            if (p == null)
            {
                return NotFound();
            }
            p.EventName = @event.EventName;
            p.EventDescription = @event.EventDescription;
            p.EventDate = @event.EventDate;
            p.StartTime = @event.StartTime;
            p.EndTime = @event.EndTime;
            p.SpeakerName = @event.SpeakerName;
            p.SpeakerDetails = @event.SpeakerDetails;
            p.VenueId = @event.VenueId;
            int n = db.Database.ExecuteSqlInterpolated($"DELETE FROM EventsReg WHERE EventId={p.EventId}");

            foreach (var x in @event.EventRegs)
            {
                db.EventsReg.Add(new EventReg
                {
                    EventId = p.EventId,
                    VisitorId = x.VisitorId
                });
            }

            //db.Entry(@event).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            db.Events.Add(@event);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.EventId }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await db.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            db.Events.Remove(@event);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return db.Events.Any(e => e.EventId == id);
        }
    }
}
