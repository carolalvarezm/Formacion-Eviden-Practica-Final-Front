import { categoriaModel } from "./categoria.model";
import { marcaModel } from "./marca.model";
import { serieModel } from "./serie.model";

export interface productoModel {
    id:Number|null;
    name:String;
    description:String;
    image:String|null;
    serie:serieModel|null;
    categories:categoriaModel[];
}
