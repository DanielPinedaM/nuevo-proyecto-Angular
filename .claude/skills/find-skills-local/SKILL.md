---
name: find-skills-local
description: Ayuda a descubrir las skills locales del proyecto (las que viven en `.claude/skills/`) y a elegir cuál invocar. Úsala cuando el usuario pregunte qué skills hay disponibles, busque una skill para una tarea concreta o quiera saber si existe una skill que haga X en este proyecto.
when_to_use: Usar cuando el usuario quiere descubrir, entender o reutilizar las skills locales del repositorio. Triggers — "¿qué skills hay?", "¿qué skills tengo disponibles?", "lista las skills", "busca una skill para X", "¿hay una skill para X?", "¿existe una skill que haga X?", "¿puedes hacer X?" (cuando X podría estar cubierto por una skill), "¿qué hace la skill X?", "¿cómo invoco la skill X?".
allowed-tools: Glob, Grep, Read
---

# Find Skills (locales)

Esta skill ayuda a descubrir las skills locales del proyecto y a elegir cuál usar para la tarea del usuario.

## Qué son las skills locales

Las skills locales son las que viven en la carpeta `.claude/skills/` del repositorio. Cada skill es una carpeta con un archivo `SKILL.md` como entrypoint (por ejemplo, `.claude/skills/git-commit/SKILL.md`). También cuentan como skills locales los archivos `.md` sueltos dentro de `.claude/commands/`.

Son skills que sirven para **este proyecto** y se comparten con el equipo versionándolas con git (la carpeta `.claude/skills/` se commitea al repositorio). A diferencia de un registro remoto, no se instalan ni se descargan: ya están en el repositorio, listas para invocarse con `/skill-name`.

## Cuándo Usar Esta Skill

Usar esta skill cuando el usuario:

- Pregunta "¿qué skills hay?" o pide listar las skills disponibles del proyecto
- Dice "busca una skill para X" o "¿hay una skill para X?"
- Pregunta "¿puedes hacer X?" cuando X podría estar cubierto por una skill local
- Quiere saber qué hace una skill del proyecto o cómo invocarla
- Quiere reutilizar o compartir con el equipo una skill del repositorio

## Dónde se buscan las skills

Buscar las skills locales en estas ubicaciones, priorizando siempre la carpeta `.claude/skills/` del proyecto:

| Ubicación                 | Ruta                                            | Alcance                                    |
| ------------------------- | ----------------------------------------------- | ------------------------------------------ |
| Proyecto (principal)      | `.claude/skills/<skill-name>/SKILL.md`          | Solo este proyecto, compartida por git     |
| Custom command            | `.claude/commands/<name>.md`                    | Solo este proyecto, compartida por git     |
| Subdirectorios / monorepo | `<subdir>/.claude/skills/<skill-name>/SKILL.md` | Al trabajar dentro de ese subdirectorio    |
| Personal                  | `~/.claude/skills/<skill-name>/SKILL.md`        | Todos los proyectos del usuario            |

El foco de esta skill es la carpeta `.claude/skills/` del proyecto: las skills locales que se comparten con el equipo mediante git.

## Cómo Ayudar a Encontrar Skills

### Paso 1: Entender qué necesita el usuario

Identificar:

1. El dominio (por ejemplo: git, testing, Angular, deployment)
2. La tarea concreta (por ejemplo: crear un commit, escribir tests, generar un componente)

### Paso 2: Localizar las skills locales

Buscar los archivos `SKILL.md` dentro de `.claude/skills/` (incluidas las carpetas padre hasta la raíz del repositorio) y los `.md` de `.claude/commands/`:

- `Glob` con el patrón `.claude/skills/**/SKILL.md` lista las skills del proyecto (incluidas las anidadas).
- `Glob` con el patrón `**/.claude/skills/**/SKILL.md` cubre las skills anidadas de un monorepo.
- `Glob` con el patrón `.claude/commands/*.md` lista los custom commands.

### Paso 3: Leer el frontmatter de cada skill

Leer el frontmatter YAML (`name`, `description`, `when_to_use`) de cada `SKILL.md` para saber qué hace la skill y cuándo aplicarla. `description` y `when_to_use` describen el propósito y los triggers de la skill.

### Paso 4: Comparar con la necesidad del usuario

Emparejar la necesidad del usuario con las skills disponibles según su `description` y `when_to_use`. Priorizar la skill cuyo propósito y triggers coincidan mejor con lo que pidió el usuario.

### Paso 5: Presentar las opciones al usuario

Al encontrar skills relevantes, presentarlas con:

1. El nombre de la skill y qué hace (según su `description`)
2. El comando para invocarla (`/skill-name`)
3. La ruta del archivo `SKILL.md`

Ejemplo de respuesta:

```
Encontré una skill que puede ayudarte. La skill "git-commit" define la
convención obligatoria de git commits del proyecto.

Para invocarla:
/git-commit

Archivo: .claude/skills/git-commit/SKILL.md
```

### Paso 6: Invocar la skill

Si el usuario quiere continuar, invocar la skill con `/skill-name` (o, si es un custom command, con `/name`). Tener en cuenta que las skills con `disable-model-invocation: true` en su frontmatter solo puede lanzarlas el usuario escribiendo `/skill-name`.

## Cuándo No Se Encuentra Ninguna Skill

Si no existe ninguna skill local relevante:

1. Indicar que no se encontró ninguna skill en `.claude/skills/` para esa tarea
2. Ofrecer resolver la tarea directamente con las capacidades generales
3. Sugerir crear una nueva skill local si es una tarea recurrente

Para crear una skill local, agregar una carpeta con un `SKILL.md` a `.claude/skills/`:

```
.claude/skills/mi-skill/SKILL.md
```

Con el frontmatter mínimo (`name`, `description` y, según la documentación oficial, `when_to_use`) más las instrucciones. Al versionarla con git, la skill queda disponible para todo el equipo.
