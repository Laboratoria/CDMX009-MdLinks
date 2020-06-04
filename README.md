# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## Md-links

Esta herramienta, creada con node.js es una solución sencilla a ese problema. En lugar de testear enlace por enlace, el comando lo hace por ti.

## Instalación

`npm install maranyil/md-links`

## Uso del CLI

Puede utilizarse para un archivo en específico como:

`md-links <path-to-file.md> [options]`

O para un directorio como:

`md-links <path-to-directory> [options]`

Ambas implementan `--stats`, para conocer el número de enlaces totales y únicos, o `--validate`, para conocer el status de los enlaces.
Pueden combinarse usando `--stats --validate` para conocer el número de enlaces totales, únicos y rotos, añadiendo estas opciones al comando inicial.


### Dependencias

Es necesario tener instalado node.js en su versión 12 en adelante.
El proyecto utiliza las siguientes dependencias:

- chalk
- figlet
- ora
- marked
- fs
- filehound 
- node-fetch
- path


## Objetivos de aprendizaje

Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron 
pendientes de tu proyecto anterior.

### Javascript
- [x] Uso de callbacks
- [ ] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [ ] Recursión

### Node
- [ ] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [ ] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [ ] Testeo de tus funciones
- [ ] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [x] Organización en Github

### Buenas prácticas de desarrollo
- [x] Modularización
- [ ] Nomenclatura / Semántica
- [ ] Linting
