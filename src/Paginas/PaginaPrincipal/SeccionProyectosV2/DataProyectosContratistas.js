import proyectos from './ProyectosContratistas.json';

import eugroofingCelular from '../../../Img/Pages/Contratistas/eugroofing-celular.jpg';
import eugroofing169 from '../../../Img/Pages/Contratistas/eugroofing-169.jpg';
import rivasedgeconstructionCelular from '../../../Img/Pages/Contratistas/rivasedgeconstruction-celular.jpg';
import rivasedgeconstruction169 from '../../../Img/Pages/Contratistas/rivasedgeconstruction-169.jpg';
import magicmarbleandtileCelular from '../../../Img/Pages/Contratistas/magicmarbleandtile-celular.jpg';
import magicmarbleandtile169 from '../../../Img/Pages/Contratistas/magicmarbleandtile-169.jpg';
import emgeneralcontractorCelular from '../../../Img/Pages/Contratistas/emgeneralcontractor-celular.jpg';
import emgeneralcontractor169 from '../../../Img/Pages/Contratistas/emgeneralcontractor-169.jpg';
import rainytimeroofingincCelular from '../../../Img/Pages/Contratistas/rainytimeroofinginc-celular.jpg';
import rainytimeroofinginc169 from '../../../Img/Pages/Contratistas/rainytimeroofinginc-169.jpg';
import promexaspaintingCelular from '../../../Img/Pages/Contratistas/promexaspainting-celular.jpg';
import promexaspainting169 from '../../../Img/Pages/Contratistas/promexaspainting-169.jpg';
import guzmanpaintingincCelular from '../../../Img/Pages/Contratistas/guzmanpaintinginc-celular.jpg';
import guzmanpaintinginc169 from '../../../Img/Pages/Contratistas/guzmanpaintinginc-169.jpg';
import burritotileandstoneCelular from '../../../Img/Pages/Contratistas/burritotileandstone-celular.jpg';
import burritotileandstone169 from '../../../Img/Pages/Contratistas/burritotileandstone-169.jpg';
import procoatdrywallincCelular from '../../../Img/Pages/Contratistas/procoatdrywallinc-celular.jpg';
import procoatdrywallinc169 from '../../../Img/Pages/Contratistas/procoatdrywallinc-169.jpg';
import avellanedaconstructionCelular from '../../../Img/Pages/Contratistas/avellanedaconstruction-celular.jpg';
import avellanedaconstruction169 from '../../../Img/Pages/Contratistas/avellanedaconstruction-169.jpg';
import irahetaprimeconstructionCelular from '../../../Img/Pages/Contratistas/irahetaprimeconstruction-celular.jpg';
import irahetaprimeconstruction169 from '../../../Img/Pages/Contratistas/irahetaprimeconstruction-169.jpg';
import mslandscapeprosCelular from '../../../Img/Pages/Contratistas/mslandscapepros-celular.jpg';
import mslandscapepros169 from '../../../Img/Pages/Contratistas/mslandscapepros-169.jpg';

const imagenes = [
    [eugroofingCelular, eugroofing169],
    [rivasedgeconstructionCelular, rivasedgeconstruction169],
    [magicmarbleandtileCelular, magicmarbleandtile169],
    [emgeneralcontractorCelular, emgeneralcontractor169],
    [rainytimeroofingincCelular, rainytimeroofinginc169],
    [promexaspaintingCelular, promexaspainting169],
    [guzmanpaintingincCelular, guzmanpaintinginc169],
    [burritotileandstoneCelular, burritotileandstone169],
    [procoatdrywallincCelular, procoatdrywallinc169],
    [avellanedaconstructionCelular, avellanedaconstruction169],
    [irahetaprimeconstructionCelular, irahetaprimeconstruction169],
    [mslandscapeprosCelular, mslandscapepros169],
];

export const DataContratistas = proyectos.map((proyecto, index) => ({
    ...proyecto,
    nombre: proyecto.titulo,
    url: proyecto.direccion,
    img: imagenes[index][0],
    img2: imagenes[index][1],
    imgWebp: '',
    img2Webp: '',
}));
