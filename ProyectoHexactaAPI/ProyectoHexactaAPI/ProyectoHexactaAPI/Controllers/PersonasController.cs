using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoHexactaAPI.Models;
using ProyectoHexactaAPI.Persistence;

namespace ProyectoHexactaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonasController : Controller
    {
        private readonly ProyectoHexactaDbContext proyectoHexactaDbContext;

        public PersonasController(ProyectoHexactaDbContext proyectoHexactaDbContext)
        {
            this.proyectoHexactaDbContext = proyectoHexactaDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPersonas()
        {
            var personas = await proyectoHexactaDbContext.Personas.ToListAsync();

            return Ok(personas);
        }

        [HttpPost]
        public async Task<IActionResult> RegistrarPersona([FromBody] Persona personaRequest)
        {
            personaRequest.Id = Guid.NewGuid();
            await proyectoHexactaDbContext.Personas.AddAsync(personaRequest);
            await proyectoHexactaDbContext.SaveChangesAsync();

            return Ok(personaRequest);
        }
    }
}
