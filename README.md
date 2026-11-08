# Supermercado La Quinta

Sitio de la tienda de barrio. Muestra el inventario, una presentación de la tienda y los datos de contacto. La gestión de artículos comparte esa misma lista durante la visita.

## Secciones

El menú de secciones va abajo en móvil y en la cabecera desde tablet. Tiene cinco destinos:

| Sección | Dirección | Qué muestra |
| --- | --- | --- |
| Inicio | `/` | Nombre, marca, tipo y unidades de cada artículo. No se puede agregar ni eliminar desde aquí. |
| Quiénes somos | `/quienes-somos` | Presentación de la tienda. |
| Contáctanos | `/contacto` | Avenida Principal 120, La Quinta, teléfono +56 9 5555 0142 y correo contacto@supermercadolquinta.cl. |
| Carrito | `/carrito` | Los artículos agregados al carrito, con su cantidad. |
| Gestión de artículos | `/gestion-articulos` | Enlaces a Agregar artículo y a Inventario de artículos. |

Una dirección desconocida explica que la sección no existe y ofrece volver a Inicio.

## Artículos

La visita empieza con seis artículos: Leche entera 1 L (24 unidades), Pan hallulla (40), Arroz grado 1 1 kg (18), Huevos de gallina 12 un (15), Aceite vegetal 1 L (9) y Detergente 1 kg (7).

En Agregar artículo (`/gestion-articulos/agregar-articulo`) se escribe el nombre y la marca, se elige el tipo y se indica la cantidad. El tipo sale de este menú: Abarrotes, Bebidas, Carnes, Congelados, Frescos, Higiene, Lácteos, Limpieza, Panadería y Otros. La cantidad tiene que ser un entero de 1 o más; si no lo es, no se guarda nada y el formulario conserva lo escrito.

Si el nombre, la marca y el tipo coinciden con una fila, sin distinguir mayúsculas y sin contar espacios al inicio o al final, las unidades se suman a esa fila. El texto ya guardado no cambia. Una marca distinta queda como otra fila.

Inventario de artículos (`/gestion-articulos/inventario-articulos`) muestra la tabla y permite eliminar una fila. Esa fila también desaparece del inicio. No se puede cambiar el nombre, la marca ni el tipo, y el inicio no tiene el control Eliminar.

La lista vive en memoria. Al recargar la página vuelven los seis artículos iniciales. No hay inicio de sesión.

## Sitio publicado

El sitio publicado está en [https://gustavoduocuc.github.io/supermercado-gustavo-dominguez-frontend2/](https://gustavoduocuc.github.io/supermercado-gustavo-dominguez-frontend2/). La rama `dev` se publica automáticamente.

## Cómo ejecutarla

Hace falta Node.js. En la carpeta del proyecto:

```bash
npm install
npm start
```

La aplicación queda en [http://localhost:3000](http://localhost:3000).

`npm test` ejecuta las pruebas en memoria. `npm run build` genera la versión de producción en `build`.
