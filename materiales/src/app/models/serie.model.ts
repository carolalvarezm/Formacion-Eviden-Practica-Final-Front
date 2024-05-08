import { marcaModel } from "./marca.model";

export interface serieModel {
    name:String;
    description:String;
    brand:marcaModel;
}
