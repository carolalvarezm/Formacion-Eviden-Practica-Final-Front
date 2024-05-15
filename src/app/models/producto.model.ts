import { SafeUrl } from "@angular/platform-browser";
import { categoriaModel } from "./categoria.model";
import { marcaModel } from "./marca.model";
import { serieModel } from "./serie.model";

export interface productoModel {
    id:Number|null;
    name:String;
    description:String;
    image:string|ArrayBuffer|null;
    serie:serieModel|null;
    brand:marcaModel|null;
    categories:categoriaModel[];
}
