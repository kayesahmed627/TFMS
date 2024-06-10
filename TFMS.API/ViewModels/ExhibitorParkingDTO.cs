using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TFMS.Lib.Models;

namespace TFMS.API.ViewModels
{
    public class ExhibitorParkingDTO
    {
        public int ParkingPassId { get; set; }

        public string NumberPlate { get; set; } = default!;
        public DateTime? ParkingDate { get; set; }
        public TimeSpan? CheckInTime { get; set; } = default!;
        public TimeSpan? CheckOutTime { get; set; } = default!;
        public int Token { get; set; }
        public int ExhibitorId { get; set; }
        public string CompanyName { get; set; } = default!;
    }
}
