# Archivo Markdown

Este es un archivo de prueba con texto del readme. 

Las **caraterísticas técnicas** de tu aplicación serán las siguientes:
- Debe ser una Single-Page Application [SPA](https://dzone.com/articles/how-single-page-web-applications-actually-work) ([versión traducida](https://dzone.com/articles/how-single-page-web-applications-actually-work))
- Debe ser diseñada con un enfoque [mobile first](https://darwindigital.com/mobile-first-versus-responsive-web-design/) ([versión traducida](https://translate.google.com/translate?hl=&sl=auto&tl=es&u=https%3A%2F%2Fdarwindigital.com%2Fmobile-first-versus-responsive-web-design))
- Debe permitir la persintencia de datos
  
### Planificación

* Te recomendamos utilizar *projects*, *issues* y *milestones* de GitHub para gestionar la planificación de tu proyecto. Estos recursos serán la fuente de organización de tu equipo y a través de estas herramientas tus coaches podrán ver el avance del proyecto y darte feedback.

* Escribir, de manera colaborativa, las **Definiciones de terminado** y **Criterios de Aceptación** por cada **Historia de usuario** que te daremos para este proyecto y que se deberán ver reflejadas en tu planificación.

* **Priorizar** la implementación de tus funcionalidades, en función al esfuerzo que demandan en relación al valor que le aportan al usuario, y ejecutar en equipo todas las historias de usuario dentro del tiempo estimado para cada sprint y que finalmente se vean reflejadas en publicaciones completamentamente funcionales al final de cada sprint.

* Adquirir la disciplina de la completitud, terminando una historia de usuario antes de pasar a la siguiente (es decir, que cumple con *Definición de Terminado* y *Criterios de Aceptación* contemplando todos los puntos que son objetivos de aprendizaje para este proyecto).

### Desarrollo frontend

#### Arquitectura de la aplicación

- Diseñar la arquitectura de tu aplicación, modularizando tu código a través de *es modules* ([`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import) y [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export))

- Familiarizarte con el patrón  modelo - vista - controlador ([MVC](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador)).

#### Tecnologías HTML5 y CSS3/SASS

* Aplicar HTML5 semántico en tu proyecto.
* Aplicar y reforzar los conceptos fundamentales de CSS3.
* Implementar selectores de clase evitando la redundancia de estilos en CCS3.
* Utilizar `flexbox` para lograr un diseño `mobile first`, implementando un layout que te permita crear un diseño adaptativo para **mobile y desktop**

A continuación te proporcionamos el layout (diseño) de la vista mobile y desktop que deberás replicar visualmente y cuyo contenido, colores y fuentes de texto, dejaremos a tu elección.

* Vista mobile

    ![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)

* Vista Desktop

    ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)


* Te dejamos un ejemplo de cómo definir criterios de aceptación y definiciones de terminado para una H.U. Si se te complica definirlas o no tienes idea de que considerar para cada H.U. es de gran ayuda revisar redes sociales como `facebok`, `twitter`, `instagram`, `devopedia` o la red social que más te guste y puedas evaluar qué consideran en cada funcionalidad para darla como terminada y aceptada.

    > Como usuario nuevo debo poder crear una cuenta con email y password para 
    > poder iniciar sesion. Por otro lado, necesito también tener la opción de 
    > iniciar sesión con mi cuenta de Google o Facebook.
    >
    > **Criterios de aceptación**
    > - Si el mail o password no es válido, al momento de logearme, debo poder 
    >   ver un mensaje de error.
    > - Debe ser visible si hay algún mensaje de error.
    > - Debo poder ver esta página de creación en Móviles y desktop (responsive). 
    > - No debe necesitar recargar la página para crear una cuenta (SPA).
    >
    > **Definición de terminado**
    > - La funcionalidad cumple satisface los criterios de aceptación.
    > - La funcionalidad tiene _test unitarios_.
    > - El diseño visual corresponde al prototipo de alta fidelidad.
    > - El código de esta funcionalidad recibió code review.
    > - La funcionalidad esta desplegada y pública para ser probada. 
    > - La funcionalidad fue probada manualmente.
    > - Se hicieron pruebas de usuabilidad y se implementó el feedback si se 
    >   consideró necesario.

### HTML y CSS

* [x] [HTML semántico](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
* [x] [CSS `flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [x] Construir tu aplicación respetando el diseño realizado (maquetación).

### DOM y Web APIs

* [x] [Manipulación dinámica del DOM](https://developer.mozilla.org/es/docs/Referencia_DOM_de_Gecko/Introducci%C3%B3n)
* [ ] [History API](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)
* [ ] [`localStorage`]

### Javascript

* [x] [Uso de callbacks](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [x] [Consumo de Promesas](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [x] Uso ES modules
([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))

### Firebase

* [x] [Firestore](https://firebase.google.com/docs/firestore)
* [x] [Firebase Auth](https://firebase.google.com/docs/auth/web/start)
* [ ] [Firebase security rules](https://firebase.google.com/docs/rules)
* [x] [Uso de onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen)
| [onAuthStateChanged](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)

### Testing

* [ ] [Testeo de tus funciones](https://jestjs.io/docs/es-ES/getting-started)
* [ ] [Testeo asíncrono](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Mocking](https://jestjs.io/docs/es-ES/manual-mocks)

### Colaboración en Github

* [x] Branches
* [x] Pull Requests
* [ ] Tags

### Organización en Github

* [x] Projects
* [x] Issues
* [ ] Labels
* [ ] Milestones

### Buenas prácticas de desarrollo

* [x] Modularización
* [x] Nomenclatura / Semántica
* [ ] Linting

***

### Otras:

* [Pildora SPA](https://www.loom.com/share/fa63a8ad0e9a43428222c15b6f6613d3)
* [Repositorio de pildora de SPA](https://github.com/betsyvies/bootcamp-spa)
* [Pildora de mock Firebase](https://www.youtube.com/watch?v=06myVn41OTY&t=1s)
* [Repositorio de pildora de mock Firebase](https://github.com/Danielalab/2018-2-Testing)
* [Pildora MVC](https://github.com/merunga/todomvc-vanillajs)
* [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)
* [Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
* [Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
* [Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)
* [Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)
* [Mobile First - ZURB](https://zurb.com/word/mobile-first)
* [Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)

***
