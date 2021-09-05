import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[]= [];
  modal: HTMLIonModalElement


  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(){
    this.moviesService.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      })
      this.getPopulares()
     
  }

  cargarMas(){
   this.getPopulares()
  }

  getPopulares(){
    this.moviesService.getPopular()
    .subscribe( resp => {
      const arrTemp = [ ...this.populares, ...resp.results]
      this.populares = arrTemp
    })
  }

   getModal(event){
    // this.router.navigateByUrl('/tabs/tab2').then( () => {
    //   this.router.navigateByUrl('/tabs/tab1').then( ()=> {
        this.modal = event;   

      // })
    // })
  }

  canDeactivate(){    
    if(this.modal){
       this.modal.dismiss(); 
       this.modal = undefined;
       return false
      }
    return true
  }

}
