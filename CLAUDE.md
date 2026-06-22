# Reglas de idioma
* Responder siempre en español.

* Redactar explicaciones y documentación en español.

* Escribir código en inglés.

* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos y variables en inglés.

* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload).

* No traducir nombres de frameworks, librerías, APIs ni patrones de diseño.

## Commits
* Utilizar Conventional Commits para la estructura del commit y Gitmoji para el emoji.

* Mantener el tipo del commit en inglés (`feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `build`, `ci`, `chore`, etc.).

* Redactar en español el alcance descriptivo del commit (`subject`) y la descripción detallada del commit (`body`).

* Agregar siempre un emoji al inicio del mensaje del commit.

* El emoji debe ir antes del tipo del commit.

* El scope es opcional y debe escribirse en inglés cuando aplique.

### Formato
`<emoji>` `<type>`(`<scope>`): `<mensaje en español>`

### Ejemplo
✨ feat(auth): agregar validación de token JWT

### Emojis por tipo de commit

| Tipo de commit | Emoji | Descripción (definición)                                                                                          |
| ------------- | --- | -------------------------------------------------------------------------------------------------------------------- |
| feat          | ✨ | Nueva funcionalidad o capacidad del sistema                                                                           |
| fix           | 🐛 | Corrección de errores o fallos                                                                                        |
| docs          | 📝 | Cambios únicamente en documentación: archivos Markdown, README, carpeta docs, guías, manuales y contenido informativo |
| style         | 🎨 | Cambios visuales, estilos, maquetación, UI/UX, responsive y textos visibles sin modificar lógica del negocio          |
| refactor      | ♻️ | Reestructuración del código sin cambiar comportamiento                                                                |
| perf          | ⚡ | Mejoras de rendimiento o eficiencifa                                                                                  |
| test          | ✅ | Creación o modificación de pruebas                                                                                    |
| build         | 📦 | Cambios relacionados con build, compilación o empaquetado                                                             |
| ci            | 👷 | Cambios en integración continua o automatización de pipelines                                                         |
| chore         | 🔧 | Tareas de mantenimiento general que no modifican funcionalidad                                                        |
| revert        | ⏪ | Reversión de cambios, versiones o despliegues anteriores                                                              |
| docker        | 🐳 | Cambios relacionados con Docker, Kubernetes y contenedores                                                            |
| hotfix        | 🚑 | Corrección urgente de errores críticos en producción                                                                  |
| deps          | ⬆️ | Cambios relacionados con dependencias: agregar, actualizar o eliminar paquetes del proyecto                           |
| wip           | 🚧 | Trabajo en progreso no finalizado                                                                                     |
| init          | 🎉 | Inicialización del proyecto o configuración inicial                                                                   |
| merge         | 🔀 | Integración de ramas, combinación de cambios y resolución de conflictos de Git                                        |
| remove        | ⚰️ | Eliminación definitiva de código, archivos, carpetas, funcionalidades o dependencias que ya no son necesarias         |
| i18n          | 🌐 | Internacionalización o traducciones                                                                                   |
| lint          | 🚨 | Cambios relacionados con análisis estático, reglas de calidad de código y configuración de herramientas como ESLint   |
| accessibility | ♿ | Mejoras de accesibilidad                                                                                              |
| mock          | 🤡 | Cambios relacionados con mocks, datos simulados o datos quemados utilizados para pruebas y desarrollo                 |

### Regla para tipos no listados

* Nunca omitir el emoji.

* Priorizar coherencia semántica sobre coincidencia exacta.
