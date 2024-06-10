using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TFMS.Lib.Models;

namespace TFMS.API.ViewModels
{
    public class VisitorParkingDTO
    {
        public int ParkingId { get; set; }
        public VehicleType VehicleType { get; set; }
        public string NumberPlate { get; set; } = default!;
        public DateTime? ParkingDate { get; set; }
        public TimeSpan? CheckInTime { get; set; } = default!;
        public TimeSpan? CheckOutTime { get; set; } = default!;
        public int Token { get; set; }
        public decimal? ParkingFare { get; set; }
        public int VisitorId { get; set; }
        public string VisitorName { get; set; } = default!;

    }
}
