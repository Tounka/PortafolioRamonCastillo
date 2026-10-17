// Los videos están alojados en YouTube (no listados). Basta con cambiar el ID de cada clase.
const youtube = (id) => ({
  youtubeId: id,
  src: id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null,
  poster: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null,
});

export const CURSO_FIREBASE = {
  id: "firebase",
  titulo: "Firebase desde cero",
  subtitulo: "Backend serverless para apps web modernas",
  nivel: "Principiante · Intermedio",
  descripcion:
    "Curso práctico donde construyo, paso a paso, la base de un proyecto real con Firebase: autenticación, despliegue, funciones en la nube, analítica y almacenamiento de archivos.",
  clases: [
    {
      titulo: "Introducción a Firebase",
      descripcion: "Qué es Firebase, qué problemas resuelve y cómo encaja en un stack con React.",
      duracion: "34:39",
      ...youtube("HJ6JImOsLuw"),
    },
    {
      titulo: "Configuración del proyecto",
      descripcion: "Creación del proyecto en la consola, SDK web y primera conexión desde el código.",
      duracion: "1:46:39",
      ...youtube(null /* TODO: falta subir clase 02 */),
    },
    {
      titulo: "Authentication",
      descripcion: "Registro, inicio de sesión y manejo de usuarios con Firebase Auth.",
      duracion: "1:27:38",
      ...youtube(null /* TODO: falta subir clase 03 */),
    },
    {
      titulo: "Hosting",
      descripcion: "Publica tu aplicación en producción con Firebase Hosting y la CLI.",
      duracion: "29:20",
      ...youtube("L-929QYJIvg"),
    },
    {
      titulo: "Cloud Functions",
      descripcion: "Lógica de servidor sin servidores: triggers, endpoints HTTP y despliegue.",
      duracion: "1:51:08",
      ...youtube("Q_E878CytHM"),
    },
    {
      titulo: "Analytics",
      descripcion: "Mide el comportamiento de tus usuarios con eventos y métricas de Google Analytics.",
      duracion: "29:10",
      ...youtube("BsMSAI9mhDk"),
    },
    {
      titulo: "Storage",
      descripcion: "Subida, descarga y reglas de seguridad para archivos con Cloud Storage.",
      duracion: "43:55",
      ...youtube("r1tM7Z4XgTY"),
    },
  ],
};
