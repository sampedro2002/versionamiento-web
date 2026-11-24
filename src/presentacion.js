// ============================================================
//  IMPORTACIONES
//  - Hojas de estilo globales y específicas de la presentación
//  - Funciones que pintan navbar y footer (layout compartido)
// ============================================================
import './styles/style.css';
import './styles/presentacion.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';

// ============================================================
//  DATOS DE LAS LÁMINAS (30 diapositivas)
//  Cada objeto describe una lámina:
//    kind   -> 'cover' | 'end' para portada y cierre; si no, lámina normal
//    kicker -> etiqueta pequeña sobre el título
//    title / sub -> título y subtítulo
//    foot   -> pie opcional (por defecto "G2 · Gestión de versionamiento")
//    blocks -> bloques de contenido: cards, flow, rows, table, note, bar, list
//  Las tarjetas (cards) usan color 'azul' | 'gris' | 'naranja'.
//  En las tarjetas de comandos, hot:true marca el comando más usado (amarillo).
//  El orden del array define el orden de navegación.
// ============================================================
const LAMINAS = [
  {"kind": "cover", "title": "Un repositorio, dos plataformas", "sub": "La historia de un equipo de cuatro que necesitaba trabajar sin pisarse.", "kicker": "G2 · Arquitectura de software", "names": "Jhon Ávila · Alexander Chicango · José Cuadro · Bruno Sampedro"},
  {"title": "Ya tenemos la infraestructura: ahora, el software", "kicker": "Punto de partida", "blocks": [{"t": "cards", "arrows": true, "ht": 1.0, "cards": [{"h": "Infraestructura", "items": ["Servidores, red y servicios ya disponibles."], "color": "azul", "text": true}, {"h": "Software", "items": ["Las aplicaciones que se ejecutarán sobre esa infraestructura."], "color": "azul", "text": true}]}, {"t": "note", "bold": true, "text": "Antes de escribir código hay que decidir qué software construimos y dónde vive su código."}, {"t": "cards", "ht": 1.75, "cards": [{"h": "Sistema", "items": ["El sistema operativo y los controladores que hacen funcionar el equipo."], "color": "azul", "text": true}, {"h": "Aplicación", "items": ["Los programas que usan las personas: web, móvil y escritorio."], "color": "azul", "text": true}, {"h": "Desarrollo", "items": ["Editores, compiladores y control de versiones para construir más software."], "color": "azul", "text": true}, {"h": "Embebido", "items": ["El código dentro de dispositivos: routers, sensores y electrodomésticos."], "color": "azul", "text": true}]}, {"t": "note", "text": "Nuestro foco: el software de aplicación y las herramientas de desarrollo que lo cuidan, como Git."}]},
  {"title": "Cuatro personas, los mismos archivos", "sub": "Nos pasó lo de siempre: copias «final_v3», cambios pisados y nadie sabía qué versión era la buena. No fuimos los primeros.", "blocks": [{"t": "cards", "ht": 2.4, "cards": [{"h": "Git", "items": ["Linus Torvalds perdió la licencia de su herramienta para el kernel de Linux y escribió la primera versión de Git en 10 días."], "color": "azul", "big": "2005", "text": true}, {"h": "GitHub", "items": ["Chris Wanstrath, PJ Hyett y Tom Preston-Werner hicieron Git social: compartir y revisar código en la web. Microsoft lo compró en 2018."], "color": "azul", "big": "2008", "text": true}, {"h": "GitLab", "items": ["Dmitriy Zaporozhets y Valery Sizov crearon una alternativa abierta e instalable en servidor propio."], "color": "azul", "big": "2011", "text": true}]}]},
  {"title": "Git se volvió el estándar", "blocks": [{"t": "cards", "ht": 1.7, "cards": [{"h": null, "items": ["de los desarrolladores usa Git"], "color": "azul", "big": "93 %", "text": true}, {"h": null, "items": ["de desarrolladores en GitHub"], "color": "azul", "big": "180 M+", "text": true}, {"h": null, "items": ["plataformas, un mismo proyecto"], "color": "azul", "big": "2", "text": true}]}, {"t": "note", "text": "Fuentes: Stack Overflow (2022) y GitHub Octoverse (2025). Ver referencias."}]},
  {"title": "Dividimos el proyecto en tareas", "sub": "Cada actividad tiene un responsable y un resultado concreto.", "blocks": [{"t": "cards", "ht": 3.3, "cards": [{"h": "1. Crear actividades", "items": ["Proyecto: Versionamiento Web G2", "PROYECTO · Versionamiento Web", "VER-8 Documentación", "VER-7 Revisión de Pull Requests", "VER-6 Configurar repositorios"], "color": "azul", "bullets": true}, {"h": "2. Repartir responsabilidades", "items": ["VER-8 Alexander", "VER-7 José", "VER-6 Jhon", "VER-5 Bruno", "Una persona responsable por tarea."], "color": "azul", "bullets": true}]}, {"t": "note", "bold": true, "text": "Tarea pequeña + responsable claro = trabajo organizado"}]},
  {"title": "El tablero muestra el avance", "sub": "Movemos cada actividad según su estado.", "blocks": [{"t": "flow", "chips": [["POR HACER", "Pendiente"], ["EN CURSO", "En desarrollo"], ["EN REVISIÓN", "Validación"], ["FINALIZADA", "Completada"]], "ht": 1.1}, {"t": "cards", "ht": 1.6, "cards": [{"h": "¿Qué registramos en cada tarea?", "items": ["Responsable · Prioridad · Estado"], "color": "azul", "text": true}, {"h": "Regla del equipo", "items": ["Revisar antes de marcar como finalizada."], "color": "azul", "text": true}]}, {"t": "note", "bold": true, "text": "Así evitamos duplicar esfuerzos y sabemos qué falta por entregar."}]},
  {"title": "Cada cambio recorre un camino", "sub": "Cada integrante trabajó su página en su rama. Nada entra sin pull request.", "blocks": [{"t": "flow", "chips": [["Feature/Ver-n…"], ["develop"], ["test"], ["main"]], "ht": 0.7}, {"t": "cards", "ht": 1.5, "cards": [{"h": "main", "items": ["Dos aprobaciones"], "color": "azul", "text": true}, {"h": "test y develop", "items": ["Una aprobación"], "color": "azul", "text": true}, {"h": "Espejo", "items": ["GitHub es la fuente; cada push se replica en GitLab."], "color": "azul", "text": true}]}]},
  {"title": "Nadie fusiona solo", "blocks": [{"t": "rows", "rows": [["main", "Pull request con dos aprobaciones"], ["test", "Pull request con una aprobación"], ["develop", "Pull request con una aprobación"]]}]},
  {"title": "Mismo Git, distinto modelo", "blocks": [{"t": "table", "head": ["", "GitHub", "GitLab"], "rows": [["Automatización", "Workflows que reaccionan a eventos", "Etapas y jobs en un solo YAML"], ["Ejecución", "Máquina virtual por job", "Contenedores con imagen propia"], ["Organización", "Organizaciones, equipos y roles", "Grupos con herencia de permisos"], ["Instalación propia", "Solo plan empresarial (de pago)", "Gratuita (GitLab Community)"]]}, {"t": "note", "text": "El flujo de Git no cambia: cambian dónde corre la automatización y cómo se reparten los permisos."}]},
  {"title": "CI/CD: el robot que revisa y publica", "blocks": [{"t": "cards", "ht": 2.4, "cards": [{"h": "Integración continua", "items": ["Cada cambio se integra a la rama compartida y se valida solo: compila, prueba y valida el HTML. Los errores aparecen en minutos."], "color": "gris", "tag": "CI", "text": true}, {"h": "Entrega o despliegue continuo", "items": ["Si la validación pasa, el cambio se publica sin pasos manuales. Aquí, hacia GitHub Pages y GitLab Pages."], "color": "naranja", "tag": "CD", "text": true}]}]},
  {"title": "La configuración vive fuera del código", "blocks": [{"t": "table", "head": ["", "GitHub", "GitLab"], "rows": [["Datos sensibles", "Secrets", "Variables Masked"], ["Producción", "Entornos con revisores", "Variables protegidas"], ["Predefinidas", "GITHUB_SHA", "CI_COMMIT_SHORT_SHA"]]}, {"t": "note", "text": "Los datos sensibles y de producción se guardan en la plataforma, no en el código."}]},
  {"title": "Comandos de todos los días", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Ramas", "items": [{"cmd": "git switch -c rama", "desc": "crea una rama y entra", "hot": true}, {"cmd": "git switch rama", "desc": "cambia de rama", "hot": true}, {"cmd": "git merge rama", "desc": "fusiona una rama en la actual", "hot": false}, {"cmd": "git rebase main", "desc": "reubica tus commits sobre main", "hot": false}, {"cmd": "git branch -d rama", "desc": "borra una rama", "hot": false}], "color": "azul", "cmd": true}, {"h": "Sincronizar", "items": [{"cmd": "git fetch", "desc": "trae cambios sin fusionar", "hot": false}, {"cmd": "git pull", "desc": "trae y fusiona", "hot": true}, {"cmd": "git push -u origin rama", "desc": "sube la rama al remoto", "hot": true}, {"cmd": "git stash", "desc": "guarda cambios a un lado", "hot": false}, {"cmd": "git tag -a v1.0.0 -m \"x\"", "desc": "marca una versión", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos de todos los días", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Empezar", "items": [{"cmd": "git init", "desc": "crea el repositorio", "hot": false}, {"cmd": "git clone URL", "desc": "copia un repo remoto", "hot": true}, {"cmd": "git config --global user.name", "desc": "define tu nombre de autor", "hot": false}, {"cmd": "git remote -v", "desc": "lista los remotos", "hot": false}, {"cmd": "git branch -M main", "desc": "renombra la rama a main", "hot": false}], "color": "azul", "cmd": true}, {"h": "Guardar", "items": [{"cmd": "git status", "desc": "muestra el estado actual", "hot": true}, {"cmd": "git add .", "desc": "prepara todos los cambios", "hot": true}, {"cmd": "git commit -m \"msg\"", "desc": "guarda los cambios", "hot": true}, {"cmd": "git diff", "desc": "muestra las diferencias", "hot": false}, {"cmd": "git log --oneline", "desc": "historial resumido", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos para ir más lejos", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Inspeccionar", "items": [{"cmd": "git show SHA", "desc": "detalle de un commit", "hot": false}, {"cmd": "git log --graph --oneline", "desc": "historial en forma de árbol", "hot": false}, {"cmd": "git shortlog -sn", "desc": "commits por autor", "hot": false}, {"cmd": "git diff main..rama", "desc": "diferencias entre ramas", "hot": false}, {"cmd": "git grep texto", "desc": "busca texto en el código", "hot": false}], "color": "azul", "cmd": true}, {"h": "Ordenar historia", "items": [{"cmd": "git rebase -i HEAD~3", "desc": "edita los últimos 3 commits", "hot": false}, {"cmd": "git merge --squash rama", "desc": "une una rama en un solo commit", "hot": false}, {"cmd": "git cherry-pick SHA", "desc": "copia un commit a la rama actual", "hot": false}, {"cmd": "git commit --fixup SHA", "desc": "corrige un commit anterior", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos para ir más lejos", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Trabajo en paralelo", "items": [{"cmd": "git worktree add ../x rama", "desc": "abre otra rama en otra carpeta", "hot": false}, {"cmd": "git stash list", "desc": "lista lo guardado a un lado", "hot": false}, {"cmd": "git submodule add URL", "desc": "incluye otro repo dentro", "hot": false}, {"cmd": "git remote add gitlab URL", "desc": "agrega GitLab como remoto", "hot": false}], "color": "azul", "cmd": true}, {"h": "Etiquetas y ajustes", "items": [{"cmd": "git tag", "desc": "lista las etiquetas", "hot": false}, {"cmd": "git push --tags", "desc": "sube las etiquetas", "hot": false}, {"cmd": "git config --list", "desc": "muestra la configuración", "hot": false}, {"cmd": "git config alias.st status", "desc": "atajo: git st = git status", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos exclusivos de GitHub (gh)", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Pull requests", "items": [{"cmd": "gh pr create --base main", "desc": "crea un pull request hacia main", "hot": true}, {"cmd": "gh pr list", "desc": "lista los abiertos", "hot": false}, {"cmd": "gh pr checkout 1", "desc": "descarga el PR 1 para probarlo", "hot": false}, {"cmd": "gh pr review 1 --approve", "desc": "aprueba el PR 1", "hot": true}, {"cmd": "gh pr merge 1 --merge", "desc": "fusiona el PR 1", "hot": false}], "color": "azul", "cmd": true}, {"h": "Repositorios", "items": [{"cmd": "gh auth login", "desc": "inicia sesión", "hot": true}, {"cmd": "gh repo create", "desc": "crea un repo nuevo", "hot": false}, {"cmd": "gh repo clone u/repo", "desc": "clona un repo", "hot": true}, {"cmd": "gh repo fork", "desc": "bifurca un repo", "hot": false}, {"cmd": "gh repo view --web", "desc": "abre el repo en el navegador", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos exclusivos de GitHub (gh)", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Issues", "items": [{"cmd": "gh issue create", "desc": "reporta una tarea o bug", "hot": true}, {"cmd": "gh issue list", "desc": "lista los pendientes", "hot": false}, {"cmd": "gh issue close 5", "desc": "cierra el issue 5", "hot": false}, {"cmd": "gh issue comment 5", "desc": "comenta en el issue 5", "hot": false}], "color": "azul", "cmd": true}, {"h": "Actions y releases", "items": [{"cmd": "gh run list", "desc": "lista las ejecuciones de CI", "hot": true}, {"cmd": "gh run watch", "desc": "sigue una ejecución en vivo", "hot": false}, {"cmd": "gh workflow run", "desc": "lanza un workflow", "hot": false}, {"cmd": "gh release create v1.0.0", "desc": "publica una versión", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos exclusivos de GitLab (glab)", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Merge requests", "items": [{"cmd": "glab mr create", "desc": "crea un merge request", "hot": true}, {"cmd": "glab mr list", "desc": "lista los abiertos", "hot": false}, {"cmd": "glab mr checkout 1", "desc": "descarga el MR 1 para probarlo", "hot": false}, {"cmd": "glab mr approve 1", "desc": "aprueba el MR 1", "hot": true}, {"cmd": "glab mr merge 1", "desc": "fusiona el MR 1", "hot": false}], "color": "azul", "cmd": true}, {"h": "Repositorios", "items": [{"cmd": "glab auth login", "desc": "inicia sesión", "hot": true}, {"cmd": "glab repo create", "desc": "crea un proyecto nuevo", "hot": false}, {"cmd": "glab repo clone grupo/repo", "desc": "clona un proyecto", "hot": true}, {"cmd": "glab repo fork", "desc": "bifurca un proyecto", "hot": false}, {"cmd": "glab repo view --web", "desc": "abre el proyecto en el navegador", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos exclusivos de GitLab (glab)", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Issues", "items": [{"cmd": "glab issue create", "desc": "reporta una tarea o bug", "hot": true}, {"cmd": "glab issue list", "desc": "lista los pendientes", "hot": false}, {"cmd": "glab issue close 5", "desc": "cierra el issue 5", "hot": false}, {"cmd": "glab issue note 5", "desc": "comenta en el issue 5", "hot": false}], "color": "azul", "cmd": true}, {"h": "CI/CD y releases", "items": [{"cmd": "glab ci status", "desc": "estado del pipeline actual", "hot": true}, {"cmd": "glab ci view", "desc": "ve las etapas y jobs", "hot": false}, {"cmd": "glab ci run", "desc": "lanza un pipeline", "hot": false}, {"cmd": "glab ci lint", "desc": "valida el .gitlab-ci.yml", "hot": false}, {"cmd": "glab release create v1.0.0", "desc": "publica una versión", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos para cuando algo sale mal", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Deshacer en local", "items": [{"cmd": "git restore archivo", "desc": "descarta cambios del archivo", "hot": true}, {"cmd": "git restore --staged archivo", "desc": "saca el archivo de lo preparado", "hot": false}, {"cmd": "git reset --soft HEAD~1", "desc": "deshace el commit, conserva cambios", "hot": false}, {"cmd": "git commit --amend", "desc": "corrige el último commit", "hot": false}, {"cmd": "git reset --hard", "desc": "borra todos los cambios locales", "hot": false}], "color": "azul", "cmd": true}, {"h": "Deshacer en remoto", "items": [{"cmd": "git log --oneline", "desc": "copia el SHA del commit", "hot": false}, {"cmd": "git revert a1b2c3d", "desc": "deshace un commit sin reescribir", "hot": true}, {"cmd": "git revert -m 1 SHA", "desc": "deshace un merge", "hot": false}, {"cmd": "git push origin main", "desc": "publica la reversión", "hot": false}, {"cmd": "git push --force-with-lease", "desc": "fuerza el push con seguridad", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Comandos para cuando algo sale mal", "foot": "G2 · Gestión de versionamiento · Amarillo = lo más usado a diario", "blocks": [{"t": "cards", "ht": 4.0, "cards": [{"h": "Recuperar", "items": [{"cmd": "git reflog", "desc": "todo lo que hiciste", "hot": true}, {"cmd": "git switch -c rescate SHA", "desc": "rama nueva desde un commit", "hot": false}, {"cmd": "git cherry-pick SHA", "desc": "rescata un commit", "hot": false}, {"cmd": "git bisect start", "desc": "busca el commit del bug", "hot": false}, {"cmd": "git blame archivo", "desc": "quién cambió cada línea", "hot": false}], "color": "azul", "cmd": true}, {"h": "Conflictos y limpieza", "items": [{"cmd": "git merge --abort", "desc": "cancela el merge", "hot": true}, {"cmd": "git rebase --abort", "desc": "cancela el rebase", "hot": false}, {"cmd": "git clean -fd", "desc": "borra archivos sin seguimiento", "hot": false}], "color": "azul", "cmd": true}]}]},
  {"title": "Entonces, ¿GitHub y GitLab hacen de todo?", "kicker": "Dividir", "blocks": [{"t": "cards", "ht": 2.3, "cards": [{"h": "GitHub y GitLab", "items": ["Alojan repositorios y automatizan procesos de desarrollo.", "Sus servicios están pensados principalmente para contenido estático.", "Pueden ejecutar pruebas y automatizar despliegues mediante sus herramientas de CI/CD."], "color": "azul", "bullets": true, "w": 1.4}, {"h": "Render", "items": ["Aloja y ejecuta aplicaciones", "Opción gratuita", "Publicar tu aplicación en un servidor accesible por Internet."], "color": "naranja", "bullets": true}]}, {"t": "bar", "text": "Pequeña demostración"}]},
  {"title": "¿Qué es Jenkins?", "kicker": "Alternativa", "sub": "Es un servidor de automatización gratuito y de código abierto: cada cambio en el repositorio dispara, sin intervención manual, los pasos que tú definas.", "blocks": [{"t": "flow", "chips": [["Cambio en el repositorio"], ["Jenkins lo detecta"], ["Compila y prueba"], ["Publica"]], "ht": 0.7}, {"t": "cards", "ht": 1.5, "cards": [{"h": "Tu servidor", "items": ["Se instala en tu propio servidor o equipo."], "color": "azul", "text": true}, {"h": "Un Jenkinsfile", "items": ["Los pasos se escriben en un archivo del repo."], "color": "azul", "text": true}, {"h": "Plugins", "items": ["Añaden pruebas, avisos y despliegues."], "color": "azul", "text": true}]}]},
  {"title": "¿Para qué ambiente sirve?", "blocks": [{"t": "cards", "ht": 2.7, "cards": [{"h": "Potente, pero a tu cargo", "items": ["Útil con servidor propio y pipelines complejos.", "Se conecta a GitHub o GitLab por webhooks.", "Gratis, pero el equipo lo mantiene."], "color": "gris", "tag": "Profesional", "bullets": true}, {"h": "Sirve, pero pesa", "items": ["Gratis y enseña CI/CD como en la industria.", "Exige instalar y mantener un servidor.", "Mejor en laboratorios de DevOps que en proyectos pequeños."], "color": "naranja", "tag": "Educativo", "bullets": true}]}, {"t": "note", "text": "Para nuestro proyecto basta la CI integrada de cada plataforma; Jenkins aparece cuando la automatización debe vivir en servidor propio."}]},
  {"title": "El correo institucional pesa distinto", "blocks": [{"t": "cards", "ht": 2.2, "cards": [{"h": null, "items": ["Lo solicita el estudiante.", "Reglas en repositorios privados.", "Copilot premium y Codespaces."], "color": "gris", "tag": "GitHub Education", "bullets": true}, {"h": null, "items": ["Lo solicita la universidad.", "Ultimate con usuarios ilimitados.", "50 000 minutos de CI al mes."], "color": "naranja", "tag": "GitLab for Education", "bullets": true}]}, {"t": "note", "text": "Instalación propia: GitLab Community es gratuita; en GitHub solo el plan empresarial, de pago."}]},
  {"title": "Lo que medimos y lo que aprendimos", "sub": "Tiempo hasta ver el cambio publicado", "blocks": [{"t": "cards", "ht": 2.6, "cards": [{"h": null, "items": ["GitHub Pages"], "color": "gris", "big": "49 s", "text": true, "w": 0.7}, {"h": null, "items": ["GitLab Pages"], "color": "naranja", "big": "60 s", "text": true, "w": 0.7}, {"h": "Hallazgos", "items": ["Una validación puede pasar por alto errores hasta que se prueba.", "Las rutas base de las dos Pages son distintas.", "GitLab tarda unos segundos en mostrar la misma versión en todos sus servidores."], "color": "azul", "bullets": true, "w": 2}]}]},
  {"title": "Git resolvió el problema; las plataformas, cómo vivir con él", "blocks": [{"t": "cards", "ht": 1.7, "cards": [{"h": "Mismo Git", "items": ["GitHub y GitLab resuelven lo mismo con modelos distintos."], "color": "azul", "text": true}, {"h": "Reglas", "items": ["La revisión obligatoria evita que un cambio roto llegue a main."], "color": "azul", "text": true}, {"h": "Prueba", "items": ["Una regla solo protege si se prueba. Nosotros la rompimos a propósito."], "color": "azul", "text": true}]}, {"t": "bar", "text": "Nosotros no elegimos: usamos las dos a la vez."}]},
  {"title": "Cuándo usar GitHub y cuándo GitLab", "blocks": [{"t": "cards", "ht": 2.3, "cards": [{"h": null, "items": ["Proyectos académicos y portafolio.", "Comunidad e integraciones.", "Beneficios para estudiantes."], "color": "gris", "tag": "GitHub", "bullets": true}, {"h": null, "items": ["Servidores propios.", "Todo el ciclo en una herramienta.", "Organizaciones con datos sensibles."], "color": "naranja", "tag": "GitLab", "bullets": true}]}, {"t": "note", "text": "Nosotros no elegimos: usamos las dos a la vez."}]},
  {"title": "Referencias", "kicker": "Fuentes", "blocks": [{"t": "list", "items": ["Forsgren, Humble y Kim (2018). Accelerate.", "GitHub Docs y GitLab Docs.", "GitHub (2025). Octoverse.", "Stack Overflow (2022). Developer Survey."]}]},
  {"kind": "end", "title": "¿Alguna pregunta?", "kicker": "Gracias", "sub": "Grupo 2 · Gestión de versionamiento. Todo lo mostrado está publicado y se puede revisar."}
];

// ============================================================
//  RENDER: convierte cada bloque de datos en HTML
// ============================================================
const esc = (t) => String(t ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function tarjeta(c) {
  const items = c.items.map((it) => {
    if (c.cmd) return `<div class="cmd${it.hot ? ' hot' : ''}"><code>${esc(it.cmd)}</code><span>${esc(it.desc)}</span></div>`;
    return c.bullets || c.text ? `<li>${esc(it)}</li>` : `<p>${esc(it)}</p>`;
  }).join('');
  const lista = c.cmd ? items : c.bullets ? `<ul>${items}</ul>` : c.text ? items.replace(/<li>/g, '<p>').replace(/<\/li>/g, '</p>') : items;
  return `<div class="tarjeta ${c.color}" style="flex:${c.w || 1}">
    ${c.tag ? `<span class="etiqueta">${esc(c.tag)}</span>` : ''}
    ${c.big ? `<strong class="grande">${esc(c.big)}</strong>` : ''}
    ${c.h ? `<h3>${esc(c.h)}</h3>` : ''}
    ${lista}
  </div>`;
}

function bloque(b) {
  switch (b.t) {
    case 'cards':
      return `<div class="fila${b.arrows ? ' flechas' : ''}">${b.cards.map(tarjeta).join(b.arrows ? '<i>→</i>' : '')}</div>`;
    case 'flow':
      return `<div class="flujo">${b.chips.map((c, i) => `<span class="paso${c.length > 1 ? ' con-sub' : (i === b.chips.length - 1 ? ' ultimo' : '')}"><b>${esc(c[0])}</b>${c[1] ? `<small>${esc(c[1])}</small>` : ''}</span>`).join('<i>→</i>')}</div>`;
    case 'rows':
      return `<div class="filas">${b.rows.map(([a, d]) => `<div class="fila-regla"><code>${esc(a)}</code><span>${esc(d)}</span></div>`).join('')}</div>`;
    case 'table':
      return `<table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'note':
      return `<p class="nota${b.bold ? ' fuerte' : ''}">${esc(b.text)}</p>`;
    case 'bar':
      return `<div class="barra">${esc(b.text)}</div>`;
    case 'list':
      return `<ul class="lista">${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    default:
      return '';
  }
}

function laminaHtml(d) {
  if (d.kind === 'cover' || d.kind === 'end') {
    return `<span class="circulo gris"></span><span class="circulo naranja"></span>
      <p class="kicker">${esc(d.kicker)}</p>
      <h1>${esc(d.title)}</h1>
      <p class="destacada">${esc(d.sub)}</p>
      ${d.names ? `<p class="integrantes">${esc(d.names)}</p>` : ''}`;
  }
  return `${d.kicker ? `<p class="kicker">${esc(d.kicker)}</p>` : ''}
    <h2>${esc(d.title)}</h2>
    ${d.sub ? `<p class="sub">${esc(d.sub)}</p>` : ''}
    ${d.blocks.map(bloque).join('')}`;
}

// ============================================================
//  INICIALIZACIÓN
//   1) Pinta navbar y footer
//   2) Convierte el <main> en contenedor de presentación
//   3) Genera todas las láminas y los controles
//   4) Conecta botones y teclado
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');
  contenedor.classList.add('presentacion');

  contenedor.innerHTML = `
    ${LAMINAS.map((d, i) => `
      <section class="lamina ${d.kind ? 'portada' : ''} ${d.kind === 'end' ? 'cierre' : ''}" id="lamina-${i + 1}" aria-label="Lámina ${i + 1} de ${LAMINAS.length}" hidden>
        ${laminaHtml(d)}
        ${d.kind ? '' : `<p class="pie"><span>${esc(d.foot || 'G2 · Gestión de versionamiento')}</span><span>${i + 1}</span></p>`}
      </section>`).join('')}
    <div class="controles">
      <button type="button" id="anterior" aria-label="Lámina anterior">←</button>
      <output id="contador" aria-live="polite"></output>
      <button type="button" id="siguiente" aria-label="Lámina siguiente">→</button>
      <button type="button" class="texto" id="completa">Pantalla completa</button>
    </div>`;

  const laminas = contenedor.querySelectorAll('.lamina');
  const contador = contenedor.querySelector('#contador');
  let actual = 0;

  function mostrar(n) {
    actual = Math.max(0, Math.min(laminas.length - 1, n));
    laminas.forEach((lamina, i) => { lamina.hidden = i !== actual; });
    contador.textContent = `${actual + 1} / ${laminas.length}`;
  }

  function pantallaCompleta() {
    if (document.fullscreenElement) document.exitFullscreen();
    else contenedor.requestFullscreen();
  }

  contenedor.querySelector('#anterior').addEventListener('click', () => mostrar(actual - 1));
  contenedor.querySelector('#siguiente').addEventListener('click', () => mostrar(actual + 1));
  contenedor.querySelector('#completa').addEventListener('click', pantallaCompleta);

  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); mostrar(actual + 1); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); mostrar(actual - 1); }
    if (e.key === 'Home') mostrar(0);
    if (e.key === 'End') mostrar(laminas.length - 1);
    if (e.key === 'f' || e.key === 'F') pantallaCompleta();
  });

  mostrar(0);
});
