namespace ProyectoHexactaAPI.Controllers.models
{
    public class Persona
    {
        public Guid Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int Dni { get; set; }

        public DateOnly FechaNacimiento { get; set; }

        public string CategoriaEtaria { get; set; }

        public Persona(Guid id, string nombre, string apellido, int dni, DateOnly fechaNacimiento)
        {
            Id = id;    // no sé si lo necesita el ORM, por ahora lo dejo así.
            Nombre = nombre;
            Apellido = apellido;
            Dni = dni;
            FechaNacimiento = fechaNacimiento;
            this.CalcularCategoriaEtaria();
        }

        public int Edad()
        {
            return FechaNacimiento.CompareTo(DateOnly.FromDateTime(DateTime.Now));
        }

        public void CalcularCategoriaEtaria()
        {
            switch(this.Edad())
            {
                case < 0: 
                    throw new Exception("La edad no puede ser menor a cero.");
                case < 11: 
                    this.CategoriaEtaria = "Niño";
                    return;
                case < 18: 
                    this.CategoriaEtaria = "Adolescente";
                    return;
                case < 80: 
                    this.CategoriaEtaria = "Adulto";
                    return;
                default:
                    this.CategoriaEtaria = "Octogenario";
                    return;
            }
        }
    }
}
