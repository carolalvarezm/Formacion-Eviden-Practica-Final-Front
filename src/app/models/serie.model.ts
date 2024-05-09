import { marcaModel } from "./marca.model";

export interface serieModel {
    id:Number|null;
    name:String;
    description:String;
    brand:marcaModel|null;
}
