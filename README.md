# Proyecto-Final-Coderhouse : segunda entrega

Glitch: https://luxuriant-dull-couch.glitch.me/api/productos/

## Implementado
1. DAOs del contenedor "archivo"
2. DAO productos para mongodb
3. Archivo config para las distintas bases de datos
4. Archivo para dotenv para las variables de entorno
5. Imports dinámicos (faltan los require de las funcionalidades no implementadas)

## Falta implementar
1. Funcionalidad de firebase
2. DAO de carrito para mongodb


## Como inicializar el proyecto

1. Clonar el repositorio
2. Correr el srcipt npm start
3. Usar Postman para enviar los https requests con o sin parámetros

## Detalles
- Para probar el endpoint POST en la ruta .../api/carrito/:id/productos se debe enviar en el req.body la propiedad id para seleccionar un producto
- Se deben crear al menos un producto y un carrito para probar la funcionalidad ya que los archivos txt de productos y carritos están vacíos