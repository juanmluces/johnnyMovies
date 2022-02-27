import { Component, OnInit } from '@angular/core';
import { ObservablesService } from 'src/app/services/observables.service';
import { Pelicula, RespuestaMDB } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss']
})
export class TabHomePage implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[]= [];

  tabTitle = 'header.movies'
  pageLoaded = false;
  spinnerLoading: boolean = true;
  

  constructor(
    private moviesService: MoviesService,
    private observables: ObservablesService
  ) {}

  ngOnInit(){
    this.observables.setTabTitle(this.tabTitle)
    this.moviesService.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      })
      this.getPopulares()
     
  }

  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle);
    
  }

  ionViewDidEnter() {
    this.pageLoaded = true;
  }

  async cargarMas(){
    this.spinnerLoading = true;
    await this.getPopulares()
    this.spinnerLoading = false;
  }

  async getPopulares(){
   const resp = await  this.moviesService.getPopular().toPromise()
   const arrTemp = [ ...this.populares, ...resp.results]
   this.populares = arrTemp
    // .subscribe( resp => {
    // })
  }


 

}
