import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private url = 'https://login-app-bc8dc-default-rtdb.europe-west1.firebasedatabase.app';

  constructor( private http: HttpClient ) { }


  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${ this.url }/heroes.json`, heroe)
            .pipe(
              map( (resp: any) => {
                heroe.id = resp.name;
                console.log('--CREADO--');
                console.log(resp);
                return heroe;
              })
            );
      }
  
      borrarHeroe( id: string ) {

        return this.http.delete(`${ this.url }/heroes/${ id }.json`);
    
      }

  actualizarHeroe( heroe: any ) {

    const HeroeTemp = {
      ...heroe
    };

    delete HeroeTemp.id;

                console.log('--ACTUALIZADO--');
                console.log(HeroeTemp);

    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, HeroeTemp);

  }

  getHeroe( id: string ) {
    console.log("Método GetHeroe");
    console.log(this.http.get(`${ this.url }/heroes/${ id }.json`));
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( heroesObj: any ) {

    const heroes: HeroeModel[] = [];

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );
    });

    return heroes;

  }


}
