import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MovieDetailModal } from '../movie-detail/movie-detail.modal';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  tabletBreakpointPx = 900;
  desktopBpPx = 1400;


  slideOpts = {
    slidesPerView: 1.3,
    freeMode: false
  }

  @Input() peliculas: Pelicula[] = []
  @Output() modalCreated = new EventEmitter<HTMLIonModalElement>()

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.checkViewport()
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.checkViewport()
  }

  async verDetalle(id:number){
    const modal = await  this.modalCtrl.create({
      component: MovieDetailModal,
      cssClass: 'detallesClass',
      id:"movie-detail",
      componentProps: {
        id
      }
    });

    modal.present()
    this.modalCreated.emit(modal)
  }

  checkViewport(){
    const width = window.innerWidth
    switch (true) {
      case width > this.desktopBpPx:
        this. slideOpts = {
          slidesPerView: 3.3,
          freeMode: true
        }
        break;
      case width <= this.desktopBpPx && width >= this.tabletBreakpointPx:
        this. slideOpts = {
          slidesPerView: 2.3,
          freeMode: true
        }
        break;

      case width <  this.tabletBreakpointPx:
        this. slideOpts = {
          slidesPerView: 1.3,
          freeMode: true
        }
        break;
    
      default:
        break;
    }
   
    
  }

}
