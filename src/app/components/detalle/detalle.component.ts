import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, Crew, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input()id;
  pelicula: PeliculaDetalle = {};
  directors: string[] = []
  oculto = 150;
  estrella = 'star-outline'
  actores: Cast[] = [];
  slideOptActores = {
    slidesPerView: 2.3,
    freeMode: false,
    spaceBetween: -5
  }
  slideOptDirectors = {
    slidesPerView: 4,
    freeMode: false,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

   ngOnInit() {
    
    this.dataLocal.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline')
    

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
       
        this.pelicula = resp
      
        
      })
    this.moviesService.getActoresPelicula(this.id)
      .subscribe( resp => {
     
       
        this.actores = resp.cast;
        if(resp.crew) this.directors = this.getDirectors(resp.crew)
        
        
        
      })
  }

  getDirectors(crew: Crew[]){
    const dir = []
    crew.forEach(member => {
      if(member.department == "Directing") dir.push(member.name)
    })
    return dir
  }

  regresar(){
    this.modalCtrl.dismiss(true)
  }

  favorito(){
   this.estrella =  this.dataLocal.guardarPelicula(this.pelicula) ? 'star': 'star-outline'
  }

}
