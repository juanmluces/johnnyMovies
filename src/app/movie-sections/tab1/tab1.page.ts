import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from 'src/app/services/observables.service';
import { Pelicula, RespuestaMDB } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[]= [];

  tabTitle = 'header.movies'

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
    this.observables.setTabTitle(this.tabTitle)
 
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
