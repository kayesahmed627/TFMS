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
    public class ExhibitorPassesController : ControllerBase
    {
        private readonly FairDbContext db;

        public ExhibitorPassesController(FairDbContext context)
        {
            db = context;
        }

        // GET: api/ExhibitorPasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExhibitorPass>>> GetexhibitorPasses()
        {
            return await db.ExhibitorPasses
                .Include(x=>x.ExhibitorEntryExits)
                .ToListAsync();
        }


        // GET: api/ExhibitorPasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExhibitorPass>> GetExhibitorPass(int id)
        {
            var exhibitorPass = await db.ExhibitorPasses.FindAsync(id);

            if (exhibitorPass == null)
            {
                return NotFound();
            }

            return exhibitorPass;
        }


        [HttpGet("{id}/Include")]
        public async Task<ActionResult<ExhibitorPass>> GetExhibitorPassWithEntryExit(int id)
        {
            var exhibitorPass = await db.ExhibitorPasses
                .Include(x => x.ExhibitorEntryExits)
                .FirstOrDefaultAsync(x => x.ExhibitorPassId == id);

            if (exhibitorPass == null)
            {
                return NotFound();
            }

            return exhibitorPass;
        }
        [HttpGet("ExhibitorEntryExits/Of/{id}")]
        public async Task<ActionResult<IEnumerable<ExhibitorEntryExit>>> GetEntryExitOfPasses(int id)
        {
            var data = await db.ExhibitorEntryExits.Where(x => x.ExhibitorPassId == id).ToListAsync();
            return data;
        }
        // PUT: api/ExhibitorPasses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExhibitorPass(int id, ExhibitorPass exhibitorPass)
        {
            if (id != exhibitorPass.ExhibitorPassId)
            {
                return BadRequest();
            }
            var p = await db.ExhibitorPasses.FirstOrDefaultAsync(x => x.ExhibitorPassId == id);
            if (p == null)
            {
                return NotFound();
            }
            p.PersonName = exhibitorPass.PersonName;
            p.ValidFrom = exhibitorPass.ValidFrom;
            p.ValidUntil = exhibitorPass.ValidUntil;
            p.ExhibitorId = exhibitorPass.ExhibitorId;
            int n = db.Database.ExecuteSqlInterpolated($"DELETE FROM ExhibitorEntryExits WHERE ExhibitorPassId={p.ExhibitorPassId}");

            foreach (var x in exhibitorPass.ExhibitorEntryExits)
            {
                db.ExhibitorEntryExits.Add(new ExhibitorEntryExit
                {
                    ExhibitorPassId=p.ExhibitorPassId, Date = x.Date,EntryTime=x.EntryTime, ExitTime=x.ExitTime
                });
            }
            // db.Entry(exhibitorPass).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExhibitorPassExists(id))
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

        // POST: api/ExhibitorPasses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExhibitorPass>> PostExhibitorPass(ExhibitorPass exhibitorPass)
        {
            db.ExhibitorPasses.Add(exhibitorPass);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetExhibitorPass", new { id = exhibitorPass.ExhibitorPassId }, exhibitorPass);
        }

        // DELETE: api/ExhibitorPasses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExhibitorPass(int id)
        {
            var exhibitorPass = await db.ExhibitorPasses.FindAsync(id);
            if (exhibitorPass == null)
            {
                return NotFound();
            }

            db.ExhibitorPasses.Remove(exhibitorPass);
            await db.SaveChangesAsync();

            return NoContent();
        }

        private bool ExhibitorPassExists(int id)
        {
            return db.ExhibitorPasses.Any(e => e.ExhibitorPassId == id);
        }
    }
}
