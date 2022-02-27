import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private observables: ObservablesService) {}

  async ngOnInit(){
    this.observables.setTabTitle(this.tabTitle)
    this.mostrarGeneros = await this.dataLocal.recuperarMostrarGeneros()
  }

  async  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle)
    this.peliculas = await this.dataLocal.cargarFavoritos()
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas)
    this.mostrarGeneros = await this.dataLocal.recuperarMostrarGeneros()
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

 

}
