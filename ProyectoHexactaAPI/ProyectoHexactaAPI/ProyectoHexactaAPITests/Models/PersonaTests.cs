using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProyectoHexactaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProyectoHexactaAPI.Models.Tests
{
    [TestClass()]
    public class PersonaTests
    {
        public Persona ninio = new Persona(Guid.NewGuid(), "Santino", "Gonzalez", 0000, 1, 2, 2015);
        public Persona adolescente = new Persona(Guid.NewGuid(), "Manuel", "López", 1111, 4, 7, 2008);
        public Persona adulto = new Persona(Guid.NewGuid(), "Juan", "Pérez", 2222, 2, 4, 2002);
        public Persona octogenario = new Persona(Guid.NewGuid(), "Pablo", "Martínez", 3333, 6, 3, 1940);

        [TestMethod()]
        public void FechaNacimientoTest()
        {
            Assert.AreEqual(new DateOnly(2002, 4, 2), adulto.FechaNacimiento());
        }

        [TestMethod()]
        public void EdadTest()
        {
            Assert.AreEqual(20, adulto.Edad());
        }

        [TestMethod()]
        public void CategoriaEtariaTest()
        {
            Assert.AreEqual("Niño", ninio.CategoriaEtaria);
            Assert.AreEqual("Adolescente", adolescente.CategoriaEtaria);
            Assert.AreEqual("Adulto", adulto.CategoriaEtaria);
            Assert.AreEqual("Octogenario", octogenario.CategoriaEtaria);

        }
    }
}