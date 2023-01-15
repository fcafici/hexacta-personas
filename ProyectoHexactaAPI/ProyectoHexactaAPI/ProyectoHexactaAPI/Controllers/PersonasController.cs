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
        public async Task<IActionResult> ObtenerPersonas([FromQuery] string? nombre = "", [FromQuery] string? apellido = "")
        {

            var personas = await proyectoHexactaDbContext.Personas.Where<Persona>(p => p.Nombre.Contains(nombre) && p.Apellido.Contains(apellido)).ToListAsync();

            return Ok(personas);
        }

        [HttpPost]
        public async Task<IActionResult> RegistrarPersona([FromBody] Persona personaRequest)
        {
            personaRequest.Id = Guid.NewGuid();
            personaRequest.CalcularCategoriaEtaria();
            // Acá podría validar, por ejemplo, que no se repita el DNI. Creo que es una validación que tendría que hacer el back y no el front.
            // Podría hacerse un query como por ejemplo: select count(*) from Personas where dni = personaRequest.dni
            // y si el resultado es != 0 no persistir a personaRequest en la DB.
            await proyectoHexactaDbContext.Personas.AddAsync(personaRequest);
            await proyectoHexactaDbContext.SaveChangesAsync();

            return Ok(personaRequest);
        }
    }
}
