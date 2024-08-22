# Pre requisitos:

## Para ejecutar el proyecto primero hay que tener instalado lo siguiente:

- **Tener monitor similar al siguiente:**
  Tamaño pantalla: 21,45"
  Resolución de: 1920 x 1080

  - Ya que con pantallas más pequeñas como por ejemplo notebook falla los scripts por las dimensiones del navegador.
  - Por mi parte el desarrollo y ejecución fue con este tipo de pantalla Tamaño pantalla: 21,45" Resolución de: 1920 x 1080.

- **Instalar vscode**,
  tutorial:
  https://support.academicsoftware.eu/hc/es/articles/360006916138-C%C3%B3mo-instalar-Microsoft-Visual-Studio-Code

- **Instalar node**,
  tutorial:
  https://www.aluracursos.com/blog/como-instalar-nodejs-en-windows-linux-y-macos?utm_source=google&utm_medium=cpc&utm_campaign=AL_PRF_Search_Pmax&gad_source=1&gclid=CjwKCAjwoJa2BhBPEiwA0l0ImKP3PoUfUq_rTA2-pcDRN04D3pyFluHm5GtQW9x19Vu5negH1ZGhxhoCPk8QAvD_BwE

- **Instalar npm:**
  https://kinsta.com/es/blog/como-instalar-node-js/

- **Instalar mocha y selenium con npm utilizando vscode:**
  https://www.youtube.com/watch?v=yXYG5lt2fyE
- **Instalar Git:**
  https://www.aluracursos.com/blog/guia-sobre-como-instalar-git-en-diferentes-sistemas-operativos?utm_source=google&utm_medium=cpc&utm_campaign=AL_PRF_Search_Pmax&gad_source=1&gclid=CjwKCAjwoJa2BhBPEiwA0l0ImCQmhg1CMD14rnTUbESKACuDfp8eTAbSRrAbsYx6DoltND8RJNohBhoCi4kQAvD_BwE

# Instrucciones para ejecutar:

### Antes de ejecutar proyecto, buscar archivo "\src\data\usuariosQa.json"

> Actualizar correo por cada ejecución para que no falle en el registro de un nuevo usuario ya que el correo que posee ya esta asociado
> "email": "actualizar@correo.com"

## Para ejecutar proyecto, abrir nueva terminal:

> escribir línea de comando `npm install` el cual hace referencia al "package.json" para instalar los modulos en la carpeta "node_modules"

> escribir línea de comando `npm run test`

# Detalle Flujo:

- before: Es donde se ejecuta el pre condición para todas las pruebas la cual se ejecuta una sola vez.
  Se crea el usuario con datos obtenidos del archivo "\src\data\usuariosQa.json" **NOTA**: por cada ejecución ACTUALIZAR "email": "actualizar@correo.com",
  En el formulario de ingreso va obteniendo la información de nombre, apellido, teléfono y contraseña desde el archivo externo.
  Luego ingresa una nueva dirección y también va obteniendo la información desde el mismo archivo para ir rellenando el formulario y se realiza logout.

- beforeEach: Es en donde se ejecuta las pre condiciones por cada caso siempre va antes de la prueba.
  Se valida que la creación del usuario fue correcta, y realiza login para validar que se encuentre activo antes de hacer la prueba.
  Ingresa email y password con datos desde "\src\data\usuariosQa.json" y valida que el ingreso fue correcto validando que aparezca con el texto de "Edit Account"

- it: Es en donde se ejecuta la prueba como tal y donde se hace login con el usuario creado en **"before"**, aquí se agregan los productos al carrito de compra, se valida el texto de cada producto, luego valida datos de dirección y envío obtenidos del el archivo "\src\data\usuariosQa.json" también valida el texto desde el modal de "Flat Shipping Rate - $5.00" y también en el resumen del check out revisa el mismo monto para validar integridad de la prueba, luego al terminar va al historial de órdenes y valida la fecha actual para el envío. Ya que no está mostrando una fecha después como dice em el archivo "README.md" creo que es por (GMT-4) pero trate de validarlo igual obteniendo la fecha actual y haciendo la comparación para estar seguro que la fecha está bien, otro punto fue que el estado siempre queda en "Canceled", no como aparece en el archivo "README.md" pero igual se realizó la validación.

- **Siempre en todo el flujo se fuero realizando Screenshot de todo. Los cuales quedaron en la ruta "src\evidencia" y ademas se agregaron comentarios de descripcion de flujo y referencias a url para mayor informacion.**

> Debe ser enviada vía un pull request a este repositorio https://github.com/previred/Desafio_Automatizacion_QA:

> En el detalle del commit debes indicar los siguientes datos (Nombre Completo y Correo Electrónico):
