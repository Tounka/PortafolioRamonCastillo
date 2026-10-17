// Los videos viven en public/cursos/. Si se alojan fuera (CDN, Drive, etc.), basta con cambiar `src`.
const ruta = (archivo) => `${import.meta.env.BASE_URL}cursos/firebase/${archivo}`;

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
      src: ruta("clase-01.mp4"),
      poster: ruta("clase-01.jpg"),
    },
    {
      titulo: "Configuración del proyecto",
      descripcion: "Creación del proyecto en la consola, SDK web y primera conexión desde el código.",
      duracion: "1:46:39",
      src: ruta("clase-02.mp4"),
      poster: ruta("clase-02.jpg"),
    },
    {
      titulo: "Authentication",
      descripcion: "Registro, inicio de sesión y manejo de usuarios con Firebase Auth.",
      duracion: "1:27:38",
      src: ruta("clase-03.mp4"),
      poster: ruta("clase-03.jpg"),
    },
    {
      titulo: "Hosting",
      descripcion: "Publica tu aplicación en producción con Firebase Hosting y la CLI.",
      duracion: "29:20",
      src: ruta("clase-04.mp4"),
      poster: ruta("clase-04.jpg"),
    },
    {
      titulo: "Cloud Functions",
      descripcion: "Lógica de servidor sin servidores: triggers, endpoints HTTP y despliegue.",
      duracion: "1:51:08",
      src: ruta("clase-05.mp4"),
      poster: ruta("clase-05.jpg"),
    },
    {
      titulo: "Analytics",
      descripcion: "Mide el comportamiento de tus usuarios con eventos y métricas de Google Analytics.",
      duracion: "29:10",
      src: ruta("clase-06.mp4"),
      poster: ruta("clase-06.jpg"),
    },
    {
      titulo: "Storage",
      descripcion: "Subida, descarga y reglas de seguridad para archivos con Cloud Storage.",
      duracion: "43:55",
      src: ruta("clase-07.mp4"),
      poster: ruta("clase-07.jpg"),
    },
  ],
};
