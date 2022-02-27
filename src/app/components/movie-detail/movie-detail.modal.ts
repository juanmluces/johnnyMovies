import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, Crew, PeliculaDetalle, Video } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { PeopleApiService } from 'src/app/services/people-api.service';
import { PersonDetailModal } from '../person-detail/person-detail.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './movie-detail.modal.html',
  styleUrls: ['./movie-detail.modal.scss'],
})
export class MovieDetailModal implements OnInit {

  @Input()id;
  pelicula: PeliculaDetalle = {};
  director:  Crew = null;
  oculto: boolean = true;
  limiteOculto = 150;
  favoriteIcon = 'cl-heart-outline'
  actores: Cast[] = [];
  slideOptActores = {
    slidesPerView: 2.3,
    freeMode: true,
    spaceBetween: -5
  }
  slideOptDirectors = {
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: -5
  }

  trailerURL: string = ""
  viewTrailer: boolean = false;
  pageLoaded = false;

  constructor(
    private moviesService: MoviesService, 
    private modalCtrl: ModalController, 
    private dataLocal: DataLocalService,
    private peoples: PeopleApiService
    ) {
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
    }
    
    async ngOnInit() {
     await this.modalCtrl.dismiss(null,null,'person-detail').catch(err => {})
    

   
    this.dataLocal.existePelicula(this.id).then(existe => this.favoriteIcon = (existe) ? 'cl-heart': 'cl-heart-outline')
    

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
       
        this.pelicula = resp
      
        
      })
    this.moviesService.getActoresPelicula(this.id)
      .subscribe( resp => {
     
       
        this.actores = resp.cast;
        if(resp.crew) this.director = this.getDirector(resp.crew)
        
        
        
      })
      this.trailerURL = await this.getTrailer()
    
      
  }

  ionViewDidEnter() {
    this.pageLoaded = true;
    
  }

  getDirector(crew: Crew[]): Crew{
   
    const director = crew.find(member => member.job === 'Director')
    return director;
  }

  regresar(){
    this.modalCtrl.dismiss(true)
  }

  favorito(){
   this.favoriteIcon =  this.dataLocal.guardarPelicula(this.pelicula) ? 'cl-heart': 'cl-heart-outline'
  }

  async getTrailer(){
    const result = await this.moviesService.getMovieTrailer(this.id)
    // console.log(result);
    
    
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

  // async getActorDetail(actorId: number){
  //   console.log(actorId);
  //   const actorData = await this.peoples.getActorDetail(actorId);
  //   console.log({actorData});
  // }

  async getActorDetail(id:number){
    // const dismissFirstModal = () => {
    //   modal.dismiss();
    // };
    const modal = await  this.modalCtrl.create({
      component: PersonDetailModal,
      cssClass: 'detallesClass',
      id: 'person-detail',
      componentProps: {
        id
      }
    });

    await modal.present();
  }

}


