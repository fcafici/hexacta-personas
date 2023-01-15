# Hexacta Personas - Felipe Cafici

## Parte A
Como se pidió, la aplicación está creada con Frontend en Angular + HTML, Backend en NET Core exponiendo una API REST y elegí usar base de datos SQL Server con Entity Framework como ORM.

En el backend, las capas (presentación,  aplicación y datos) se pueden ver en la estructura de carpetas dentro de *ProyectoHexactaAPI*. Por un lado, en la carpeta *Controllers* tenemos el controlador que expone la API con sus dos métodos (GET y POST) para obtener y crear personas. Por otro lado, en la carpeta *Models* está la clase Persona propiamente dicha que, valga la redundancia, modela la persona de nuestra aplicación. Por último, en la carpeta *Persistence* está el DbContext específico de nuestro proyecto, que hereda de la clase DbContext y se usa para comunicarse con la base de datos.

Se aplica la inyección de dependencias en el controlador, pasando el DbContext como parámetro al constructor de forma que si se quisiera modificar el mismo, no haría falta cambiar el controlador.

Una abstracción adicional que se podría haber hecho sería crear una clase **Adapter** entre el controlador y el ORM con métodos como persist(), get(), etc. por si se quisiera cambiar de ORM.

## Parte B
La pantalla tiene los filtros de nombre y apellido que se mandan como query parameters al backend y luego se filtran con un WHERE en la base de datos.

Hacer el filtro en el frontend y no a nivel base de datos hubiera implicado menos accesos a la base de datos y menos requests HTTP (lo cual, en principio, ahorraría un poco de tiempo), así como una página web un poco más dinámica (no hay que recargar la página porque no hay una request de por medio) pero sería un problema si hubiera un gran volumen de personas. Esto se debe a que tendrían que traerse todas las personas de la base de datos al backend y del mismo al frontend (en caso contrario se pueden hacer pedidos paginados) y recién ahí se podría filtrar. Además, para volúmenes grandes de datos, un filtro a nivel base de datos es mucho más eficiente.

## Parte C
Para las validaciones puse, en el frontend, un mínimo y máximo de caracteres en nombre y apellido, un mínimo y máximo numérico al DNI y un máximo a la fecha de nacimiento que debe ser anterior o igual al día presente. No hice una validación de edad mínima porque modelamos personas. Si hubiéramos modelado, por ejemplo, empleados, una validación de edad hubiese cobrado sentido. Al ser en el frontend, si no se cumplen los requisitos de las validaciones, ni siquiera se manda la request HTTP.

Como dije en un comentario en el Controller, en el back se podría validar que no se repita el DNI, pero no lo implementé porque no me pareció necesario para el dominio del problema.

A nivel base de datos se verifica que no se repita el ID (automáticamente por ser Primary Key), no me pareció necesario hacer ninguna otra validación.

## Parte D
Por más que normalmente el rango etario lo modelaría como un método, necesitaba que sea un atributo para que se guarde en la DB. Por ese motivo, creé un método que lo calcula y lo guarda en el atributo de la persona.

En cuanto a los tests unitarios, creé tres: uno que verifique que la fecha de nacimiento se esté guardando correctamente, otro que verifique que se calcule bien la edad, y por último uno que valide que se está asignando al rango etario correcto.

## Patrones de diseño
Al ser un dominio tan acotado, me costó implementar patrones de diseño. Sin embargo, pude identificar 
algunos.

 **- Inyección de dependencias:** si es que puede considerarse un patrón de diseño. Como mencioné en la parte A, se aplica pasando el DbContext como parámetro al constructor del PersonasController.

 **- Adapter:** también mencionado la parte A. No lo llegué a implementar pero era una opción para potencialmente cambiar de ORM.

 **- Observer:** en  *ProyectoHexactaUI/src/app/services*, el servicio personas usa métodos HTTP que pueden tardar en responder. Para eso, el método *getPersonas* es de tipo **Observable** y quienes lo llaman, los métodos *ngOnInit()* y *filtrarPersona()* (en *ProyectoHexactaUI/serc/app/components/busqueda-personas/busqueda-personas.component.ts*) se sucriben con el método **subscribe**).

## Otras preguntas
1. ¿Qué es un ORM? Ventajas y desventajas.

Un Object-Relational Mapper es un modelo que permite usar una base de datos abstrayéndose del lenguaje SQL puro así como de la base de datos que se use. Entre sus ventajas están la abstracción mencionada, la declaratividad y la posibilidad de reutilizar código.

Además, los ORM nos protegen de los SQL Injection, en los que alguien podría mandar (por ejemplo en un form) una sentencia de SQL y borrar o modificar tablas (como una de las posibles consecuencias). 

Por otro lado, como no escribimos literalmente las consultas, pueden hacerse un poco ineficientes. También pueden ser algo complejos de configurar inicialmente.

 2. Diferencias entre: cliente de BD vs driver de conexión de BD vs motor de base de datos (Dar ejemplos)

El cliente de una BD es el software que usa los servicios que proporciona un servidor de BD.
Por ejemplo: si en un restaurant hay dos computadoras con un sistema gastronómico y tienen una base de datos en la que guardan ingredientes, facturas, etc., estas dos instancias del software gastronómico son clientes de la BD.

El driver es el programa que permite la conexión entre un cliente y el motor de la BD. Son los que implementan los protocolos de comuniación para ejecutar operaciones sobre la BD. SQL Server usa un driver ODBC (Open DataBase Connectivity)

El motor de la base de datos es el software que usa el DBMS para ejecutar las operaciones CRUD (Create, Read, Update, Delete). Algunos motores son el MS SQL Server, MySql, Oracle o PostgreSQL, pero hay muchos más.

3. ¿Qué es una API REST?

Una API REST es un tipo de API que configura rutas a las que se accede mediante métodos HTTP (GET, POST, PUT, PATCH, DELETE) y que suelen devolver archivos JSON (o XML).

Entre las características de las API REST está el hecho de que cada ruta está orientada a un recurso, no tanto a una acción. Por ejemplo GET "/personas". También cabe aclarar que una de las claves de REST es que es *stateless*, es decir, el sistema no recuerda requests anteriores.

Todo esto difiere de las API SOAP, que se hacen mediante un POST siempre a la misma ruta y las operaciones e información se mandan en el cuerpo del mensaje (en XML).
