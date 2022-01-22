import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe : any = new HeroeModel();

  private url = 'https://login-app-bc8dc-default-rtdb.europe-west1.firebasedatabase.app/heroes';

  constructor( private heroesService: HeroesService,
               private http: HttpClient,
               private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') as string;
    // const id = this.route.snapshot.paramMap.get('id') as string;
    console.log(id);
   
    if ( id !== 'nuevo'){
      console.log("Insite if");
      this.heroesService.getHeroe(id)
      .subscribe( resp =>{
        this.heroe = resp;
        this.heroe.id = id;
      })
    }
    else{
      
    }
  }

  guardar( form: NgForm ) {
    if ( form.invalid ) {

      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: "Error",
      text: "Guardando información",
      icon: 'error',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id){

       peticion = this.heroesService.actualizarHeroe( this.heroe );
          // Ahora será la petición la que contenga la información.
          //  .subscribe( resp => {
          //   console.log( resp );
          // })

    } else{

        peticion = this.heroesService.crearHeroe( this.heroe );
    }
    peticion.subscribe( resp =>{

      Swal.fire({
        title: this.heroe.nombre,
        text: "Actualizado correctamente",
        icon: 'success'
      })

    })
  }

}
