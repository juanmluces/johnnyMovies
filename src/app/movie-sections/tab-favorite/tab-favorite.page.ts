import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MovieDetailModal } from 'src/app/components/movie-detail/movie-detail.modal';
import { ObservablesService } from 'src/app/services/observables.service';
import { Genre, PeliculaDetalle } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'tab-favorite',
  templateUrl: 'tab-favorite.page.html',
  styleUrls: ['tab-favorite.page.scss']
})
export class TabFavoritePage implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[];
  favoritoGenero: any[] = []
  mostrarGeneros: boolean = true
  tabTitle = 'tab3.favorite'
  

  constructor(
    private dataLocal: DataLocalService, 
    private moviesService: MoviesService, 
    private observables: ObservablesService,
    private modalCtrl: ModalController) {}

  async ngOnInit(){
    this.observables.setTabTitle(this.tabTitle)
    this.mostrarGeneros = await this.dataLocal.getShowGenres()
  }

  async  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle)
    this.peliculas = await this.dataLocal.getFavorites()
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas)
    this.mostrarGeneros = await this.dataLocal.getShowGenres()
  }




  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    if(peliculas == null) peliculas = []
    this.favoritoGenero = []
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find(genre => genre.id === genero.id)
        })
      })
    })
  }

  async verDetalle(id:number){
    await this.modalCtrl.dismiss(null, null, 'movie-detail').catch(err => {})
    const modal = await  this.modalCtrl.create({
      component: MovieDetailModal,
      cssClass: 'detallesClass',
      id:"movie-detail",
      componentProps: {
        id
      }
    });

    await modal.present()
    // this.modalCreated.emit(modal)
    const result = await modal.onDidDismiss()
    // if(result.data) this.modalDismissed.emit()
   
  }


}
