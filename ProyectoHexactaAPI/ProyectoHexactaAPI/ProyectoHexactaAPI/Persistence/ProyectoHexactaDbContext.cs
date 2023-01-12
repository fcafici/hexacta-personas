using Microsoft.EntityFrameworkCore;
using ProyectoHexactaAPI.Controllers.models;

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
