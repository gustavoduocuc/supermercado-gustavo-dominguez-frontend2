# Supermercado La Quinta

Sitio de la tienda de barrio. Muestra los artículos del inventario con un filtro por categoría, el detalle de cada artículo, un carrito, una presentación de la tienda y los datos de contacto. La gestión de artículos comparte esa misma lista durante la visita.

## Tecnologías

- React 19 con Create React App.
- React Router 7 para las rutas.
- Tailwind CSS 3 para los estilos, con el diseño adaptado a móvil, tablet y escritorio.
- Pruebas con Jest y Testing Library.

## Secciones

El menú de secciones va abajo en móvil y en la cabecera desde tablet. Tiene cinco destinos:

| Sección | Dirección | Qué muestra |
| --- | --- | --- |
| Inicio | `/` | Nombre, marca, categoría y unidades de cada artículo, con un filtro por categoría. Cada nombre abre su detalle. No se puede agregar ni eliminar desde aquí. |
| Quiénes somos | `/quienes-somos` | Presentación de la tienda. |
| Contáctanos | `/contacto` | Avenida Principal 120, La Quinta, teléfono +56 9 5555 0142 y correo contacto@supermercadolquinta.cl. |
| Carrito | `/carrito` | Los artículos agregados al carrito, con su cantidad y el total de unidades. |
| Gestión de artículos | `/gestion-articulos` | Enlaces a Agregar artículo y a Inventario de artículos. |

Una dirección desconocida explica que la sección no existe y ofrece volver a Inicio.

## Artículos

La visita empieza con seis artículos: Leche entera 1 L (24 unidades), Pan hallulla (40), Arroz grado 1 1 kg (18), Huevos de gallina 12 un (15), Aceite vegetal 1 L (9) y Detergente 1 kg (7).

En Agregar artículo (`/gestion-articulos/agregar-articulo`) se escribe el nombre y la marca, se elige el tipo y se indica la cantidad. El tipo sale de este menú: Abarrotes, Bebidas, Carnes, Congelados, Frescos, Higiene, Lácteos, Limpieza, Panadería y Otros. La cantidad tiene que ser un entero de 1 o más; si no lo es, no se guarda nada y el formulario conserva lo escrito.

Si el nombre, la marca y el tipo coinciden con una fila, sin distinguir mayúsculas y sin contar espacios al inicio o al final, las unidades se suman a esa fila. El texto ya guardado no cambia. Una marca distinta queda como otra fila.

Inventario de artículos (`/gestion-articulos/inventario-articulos`) muestra la tabla y permite eliminar una fila. Esa fila también desaparece del inicio y del carrito. No se puede cambiar el nombre, la marca ni el tipo, y el inicio no tiene el control Eliminar.

La lista vive en memoria. Al recargar la página vuelven los seis artículos iniciales. No hay inicio de sesión.

## Filtro por categoría

Inicio y Inventario de artículos tienen un selector Categoría con la opción Todas y las diez categorías. Al elegir una, solo se ven los artículos de ese tipo; si no hay ninguno, aparece el mensaje "No hay artículos en esta categoría." El filtro solo cambia lo que se muestra: no modifica ni elimina artículos del inventario, y al volver a Todas reaparecen todos.

## Detalle de un artículo

Al elegir el nombre de un artículo, en Inicio o en la tabla, se abre su detalle (`/articulos/:id`, por ejemplo `/articulos/leche`) con el nombre, la marca, el tipo y las unidades disponibles. El botón Agregar al carrito pasa una unidad del inventario al carrito; cuando ya no quedan unidades, el botón se ve deshabilitado con el texto Agotado. Si el artículo no existe, aparece un aviso con un enlace para volver a Inicio.

## Carrito

El carrito muestra una línea por artículo con su cantidad. Con los botones Aumentar y Disminuir se pasan unidades entre el inventario y el carrito; Aumentar se deshabilita cuando no quedan unidades y la línea desaparece al llegar a cero. El menú muestra el total de unidades junto a Carrito, y la página muestra el mismo total en un resumen. Con el carrito vacío se ofrece un enlace para ver los artículos. Como el resto de los datos, el carrito vive en memoria.

## Sitio publicado

El sitio publicado está en [https://gustavoduocuc.github.io/supermercado-gustavo-dominguez-frontend2/](https://gustavoduocuc.github.io/supermercado-gustavo-dominguez-frontend2/).

La rama `dev` se publica automáticamente: cada cambio que llega a `dev` ejecuta las pruebas, genera la versión de producción y la publica en la rama `gh-pages`, desde donde GitHub Pages sirve el sitio. Esa rama la actualiza el flujo, así que no se edita a mano.

## Cómo ejecutarla

Hace falta Node.js. En la carpeta del proyecto:

```bash
npm install
npm start
```

La aplicación queda en [http://localhost:3000](http://localhost:3000).

`npm test` ejecuta las pruebas en memoria. `npm run build` genera la versión de producción en `build`.

## Estructura del código

El código está en `src`, con una carpeta por tema:

| Carpeta | Contenido |
| --- | --- |
| `home` | Página de inicio y la tarjeta de producto. |
| `articles` | Inventario compartido, detalle, formulario de alta, tabla y categorías. |
| `cart` | Página del carrito y sus líneas. |
| `filters` | Filtro por categoría. |
| `shell` | Cabecera y menú de secciones. |
| `routing` | Tabla de rutas y página no encontrada. |
| `about`, `contact` | Quiénes somos y Contáctanos. |
| `content` | Textos y datos de contacto de la tienda. |
| `ui` | Componentes compartidos: botón, tarjeta, campos, títulos y estados vacíos. |
