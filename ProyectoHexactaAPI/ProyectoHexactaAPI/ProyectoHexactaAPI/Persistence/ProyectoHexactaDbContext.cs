using Microsoft.EntityFrameworkCore;
using ProyectoHexactaAPI.Models;

namespace ProyectoHexactaAPI.Persistence
{
    public class ProyectoHexactaDbContext : DbContext
    {
        public ProyectoHexactaDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Persona> Personas { get; set; }
    }
}
