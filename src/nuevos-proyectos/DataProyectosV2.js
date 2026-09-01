import proyectos from './proyectos.json';

// La asociación real se define por la carpeta donde coloques cada imagen.
const imageModules = import.meta.glob('./pimages v2/**/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
});

const carpetasPorProyecto = {
    'EUG Roofing': 'eug-roofing',
    'Rivas Edge Construction': 'rivas-edge-construction',
    'Magic Marble & Tile': 'magic-marble-tile',
    'EM General Contractor': 'em-general-contractor',
    'Rainy Time Roofing': 'rainy-time-roofing',
    'Pro-Mexas Painting Corp': 'pro-mexas-painting',
    'Guzman Painting Inc.': 'guzman-painting',
    'Burrito Tile & Stone': 'burrito-tile-stone',
    'Procoat Drywall Inc.': 'procoat-drywall',
    'Avellaneda Construction': 'avellaneda-construction',
    'Iraheta Prime Pro Construction': 'iraheta-prime',
    'MS Landscaping': 'ms-landscaping',
};

const getOrganizedImages = (titulo) => {
    const slug = carpetasPorProyecto[titulo];
    if (!slug) return [];

    const prefix = `./pimages v2/contratistas/${slug}/`;

    return Object.entries(imageModules)
        .filter(([path]) => path.startsWith(prefix))
        .sort(([pathA], [pathB]) => {
            const rank = (path) => {
                const lowerPath = path.toLowerCase();
                if (lowerPath.includes('/principal/')) return 0;
                if (lowerPath.includes('/galeria/')) return 1;
                return 2;
            };

            return rank(pathA) - rank(pathB) || pathA.localeCompare(pathB);
        })
        .map(([, image]) => image);
};

export const DataProyectosV2 = proyectos.map((proyecto) => {
    const imagenes = getOrganizedImages(proyecto.titulo);

    return {
        ...proyecto,
        nombre: proyecto.titulo,
        url: proyecto.direccion,
        descripcion: proyecto.descripcion,
        propiedadDe: 'CSLP',
        imagenPrincipal: imagenes[0] || '',
        img: imagenes[0] || '',
        img2: imagenes[0] || '',
        imgWebp: '',
        img2Webp: '',
        imagenes,
    };
});