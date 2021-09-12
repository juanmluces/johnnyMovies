import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, Crew, PeliculaDetalle, Video } from 'src/app/interfaces/interfaces';
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
  director:  string = '';
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

  trailerURL: string = ""
  viewTrailer: boolean = false;

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

   async ngOnInit() {
    

    this.slideOptActores = {
      slidesPerView: 2.3,
      freeMode: false,
      spaceBetween: -5
    }
    this.slideOptDirectors = {
      slidesPerView: 4,
      freeMode: false,
      spaceBetween: -5
    }
    this.dataLocal.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline')
    

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
       
        this.pelicula = resp
      
        
      })
    this.moviesService.getActoresPelicula(this.id)
      .subscribe( resp => {
     
       
        this.actores = resp.cast;
        if(resp.crew) this.director = this.getDirectors(resp.crew)
        
        
        
      })
      this.trailerURL = await this.getTrailer()
    
      
  }

  getDirectors(crew: Crew[]){
    const dir = []
    crew.forEach(member => {
      if(member.department == "Directing") dir.push(member.name)
    })
    return dir[0]
  }

  regresar(){
    this.modalCtrl.dismiss(true)
  }

  favorito(){
   this.estrella =  this.dataLocal.guardarPelicula(this.pelicula) ? 'star': 'star-outline'
  }

  async getTrailer(){
    const result = await this.moviesService.getMovieTrailer(this.id)
    console.log(result);
    
    
    let video: Video = null
    if(result){
      if(result.results.length == 0) return  ''
      video = result.results.find(video => video.type == 'Trailer')
    }

    if(video && video.key){ 
      const url = `https://www.youtube.com/embed/${video.key}`
      if(video.site && video.site.toLowerCase() == "youtube") return url
      return  ''
    }
  }

}


