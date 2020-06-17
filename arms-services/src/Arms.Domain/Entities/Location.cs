<<<<<<< HEAD
using System;

=======
>>>>>>> 33391e4beebc6a85b30782021b9892d3aba84f2e
namespace Arms.Domain.Entities
{
    public class Location
    {
        public int id { get; set; }
        public string code { get; set; }
        public string locationName { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime modifiedAt { get; set; }
        public string createdBy { get; set; }
        public string modifiedBy { get; set; }

    }
}