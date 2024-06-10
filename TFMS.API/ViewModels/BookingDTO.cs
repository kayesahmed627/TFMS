using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TFMS.Lib.Models;

namespace TFMS.API.ViewModels
{
    public class BookingDTO
    {
        public int BookingId { get; set; }
        public DateTime? BookingDate { get; set; }

        public decimal? BookingAmount { get; set; }

        public int ExhibitorId { get; set; }
        public string CompanyName { get; set; } = default!;

        public int PavilionId { get; set; }
        public string PavilionName { get; set; } = default!;

    }
}
