# Proyecto-Final-Coderhouse : segunda entrega

Glitch: https://luxuriant-dull-couch.glitch.me/api/productos/

## Implementado
1. DAOs del contenedor archivo
2. DAOs del contenedor MongoDB
3. DAOS del contenedor Firebase
3. Archivo config para las distintas bases de datos
4. Archivo para dotenv para las variables de entorno
5. Imports dinámicos usando require con condicional. La base de datos se cambia en el arhivo ".env"
6. Reestructuración de carpetas del proyecto para que esté modularizado

## Como inicializar el proyecto
1. Clonar el repositorio
2. Correr el srcipt npm start
3. Usar Postman para enviar los https requests con o sin parámetros

## Detalles
- Para probar el endpoint POST en la ruta .../api/carrito/:id/productos se debe enviar en el req.body la propiedad id para seleccionar un producto
- Se deben crear al menos un producto y un carrito para probar la funcionalidad ya que los archivos txt de productos y carritos están vacíos