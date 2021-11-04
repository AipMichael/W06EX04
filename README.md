Ejercicio calculadora Express
Refactoriza el ejercicio del WebService Calculadora usando Express.

Cambia el sistema por el cual la aplicación pide los datos al cliente. Habrá un endpoint para cada operación, y responderán a peticiones GET.

Si se hace cualquier petición a esos endpoints con un método que no sea GET, debemos devolver un status 403 y un objeto JSON con esta forma:

{
error: true,
message: (el que quieras)
}
Si se hace una petición a un endpoint que no exista, se debe devolver un error similar al anterior, con un status 404.

Si no se pasan los números por query params, se debe devolver un error similar al anterior, con un status 400.

Usa debug, chalk y morgan. Modulariza siguiendo el principio de responsabilidad única.

//

Crea una calculadora en Node en forma de webservice. El programa debe recibir dos números por query params (p.e. http://localhost:8000/calculator?a=6&b=3), y devolver el siguiente HTML:

Resultados:

6 + 3 = 9
6 - 3 = 3
6 \* 3 = 18
6 / 3 = 2

Si el usuario no ha proporcionado alguno de los números o éstos no son de tipo número, la aplicación debe devolver un HTML con un mensaje de error e interrumpir la ejecución del programa con un código de error.

La app debe abrirse en un puerto por defecto que esté configurado como variable de entorno, pero también se tiene que poder decir expresamente por línea de comandos en qué puerto queremos que se abra (p.e., node . --port 4000). Usar el paquete commander.

Si la request no va a /calculator, la app debe responder con un 404.
