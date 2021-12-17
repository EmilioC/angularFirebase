
// export class HeroeModel {
//     id: string;
//     nombre: string;
//     poder: string;
//     vivo: boolean;
//          constructor(
//             id: string,
//             nombre: string,
//             poder: string,
//             vivo: boolean){

//                 this.id = id;
//                 this.nombre = nombre;
//                 this.poder = poder;
//                 this.vivo = vivo
//             }
//         }

// export class HeroeModel {
//     id: undefined;
//     nombre: string;
//     poder: string;
//     vivo: boolean;
//          constructor(){
//          this.id = undefined;
//          this.nombre = "";
//          this.poder = "";
//          this.vivo = true;
//     }
// }

export class HeroeModel {

    id: string | undefined;
    nombre: string | undefined;
    poder: string | undefined;
    vivo: boolean;

    constructor() {
        this.vivo = true;
    }

}

