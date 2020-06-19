# Markdown Links

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

_Nombre del ejecutable_ Esta libreria es una herramienta usando [Node.js], que lee y analiza archivos
en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

## Pseudocodigo y diagramas de flujo

Para desarrollar la libreria se generaron 4 funciones

#1 La funcion que lee el archivo md y obtiene los links

![getLinks](/utils/getLinks.png)

#2 La funcion que analiza y muestra los links funcionales y rotos

![validate](/utils/validate.png)

#3 La funcion que muestra las estadisticas de los links funcionales y rotos

![statsLinks](/utils/Statslinks.png)

#4 La funcion que analiza y muestra los links funcionales y rotos junto con las estadisticas de los links funcionales y rotos

![validateandStats](/utils/validateandStats.png)

## Documentacion

## Guia de Uso

Para analizar un archivo .md

1. Ejecute la libreria

2. Indique la opcion deseada

   `validate` Muestra los links que contiene el archivo indicando los que funcionan y los que no

   `stats` Muestra las estadisticas de los links que funcionan y los que no

   `validateStats` Muestra las dos anteriores

   `--help` para ver la ayuda

3. indique la ruta del archivo md

   ej. index.js validate -p "Ruta del archivo"

## Instalacion
