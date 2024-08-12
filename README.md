# Miniproyecto Recemed - README

## Implementación de SSR y CSR

### SSR (Server-Side Rendering)

Para implementar SSR en las 2 páginas del login (`rut/index` y `password/index`), seguí las prácticas recomendadas en Vike, creando las carpetas correspondientes para cada una de las páginas (`rut/index` y `password/index`). Dentro de estas carpetas, generé dos archivos esenciales: `+Page.jsx`y `+data.js` para manejar la lógica de los datos en el servidor.

- **Página de Rut (`rut/index`)**: En `+data.js`, implementé la lógica de verificación del RUT para asegurar que el dato ingresado es válido. Esta verificación se realiza en el servidor para garantizar que solo se procesen RUTs válidos antes de pasar al siguiente paso del login. En el archivo `+Page.jsx`, almacené el RUT en la URL para poder transportarlo a la siguiente página. Si bien sé que el almacenamiento de la contraseña en la URL es peligroso y no es una práctica recomendada, debido al tiempo limitado no pude tokenizar la contraseña adecuadamente. Soy consciente de los riesgos y habría abordado este problema si hubiera tenido más tiempo.

- **Página de Password (`password/index`)**: En esta página, utilicé `+data.js` para manejar la lógica del POST a la API de autenticación. Una vez que se verifica y valida la contraseña, en el archivo `+Page.jsx` se almacenan el token de autenticación y el nombre del usuario en `sessionStorage`. Aunque consideré usar una herramienta como `Zustand` para manejar el estado global, debido a limitaciones de tiempo opté por esta solución más directa. De este modo, las dos páginas funcionan de manera eficiente usando SSR.

*Aún me quedaron dudas no sabía si tenía que manejar la lógica en en `server/index.js` pero por lo que leí en los archivos de el demo de vike en `+data` decía que ese archivo manejaba el server-side es por eso que seguí esa lógica.*

### CSR (Client-Side Rendering)

Para la página que muestra el listado de recetas (`recetas/+Page.jsx`), implementé un renderizado del lado del cliente (CSR). Aquí se realizó todo el proceso de obtención de datos y renderizado de las recetas. En este caso:

- **Página de Recetas (`recetas/+Page.jsx`)**: Hice el llamado a la API directamente dentro del archivo `+Page.jsx`, extrayendo el token de autenticación y el nombre del usuario desde `sessionStorage`. Implementé la lógica para manejar la paginación dentro de esta misma página, utilizando componentes adicionales como `Header` y `Pagination` para organizar mejor la estructura del código. Al igual que con las páginas SSR, consideré otras opciones para manejar el estado global pero opté por una solución sencilla debido al tiempo disponible.

## Motivo del Unit Test

Se creó un unit test para la función `data` en `rut/index/+data.js`, ya que esta función es fundamental para la validación del RUT, un paso crítico en el proceso de autenticación. Validar correctamente el RUT nos garantiza que solo usuarios válidos puedan avanzar en el proceso de login. El unit test asegura que:
- Se arroje un error si no se proporciona un RUT.
- Se valide correctamente un RUT válido.
- Se arroje un error si se proporciona un RUT inválido.

Este test es simple pero importante porque refuerza la seguridad y la robustez del sistema desde un punto temprano en el proceso de autenticación.

## Comandos necesarios

### Ejecutar el proyecto
Para ejecutar el proyecto en tu entorno local descarga o clona este repositorio y sigue estos pasos:

1. Instalar las dependencias del proyecto:
   ```bash
   npm install

2. Iniciar proyecto:
   ```bash
    npm run dev

O iniciar el proyecto en modo producción (recomiendo esta)

3. Iniciar build:
   ```bash
    npm run build

3. Iniciar proyecto en modo prod:
   ```bash
    npm run prod

### Ejecutar el unit test

1. Para ejecutar el unit test y asegurarte de que todo funciona correctamente, utiliza el siguiente comando:
     ```bash
    npm run test

Este comando ejecutará el test ubicado en tests/rutData.test.js, validando la función de validación de RUT.
