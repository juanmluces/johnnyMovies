import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[];
  favoritoGenero: any[] = []
  mostrarGeneros: boolean = true
  

  constructor(private dataLocal: DataLocalService, private moviesService: MoviesService, private router: Router) {}

  async ngOnInit(){
    this.mostrarGeneros = await this.dataLocal.recuperarMostrarGeneros()
  }

  async  ionViewWillEnter(){
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
