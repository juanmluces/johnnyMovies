import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MovieDetailModal } from '../movie-detail/movie-detail.modal';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  tabletBreakpointPx = 900;
  desktopBpPx = 1400;
    

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: false,
    spaceBetween: -10
  }

  @Input() peliculas: Pelicula[] = []
  @Input() spinnerLoading: boolean;
  @Output() cargarMas = new EventEmitter();
  @Output() modalCreated = new EventEmitter<HTMLIonModalElement>()
  @ViewChild('slides') slides: IonSlides

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.checkViewport()
  }


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.checkViewport()
  }

  async slideChanged(){
    
    const end = await this.slides.isEnd()
    if(end) this.onClick()
    // console.log({spinnerLoading: this.spinnerLoading});
    // console.log(end);
    
  }
  
  onClick(){
    this.cargarMas.emit()
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
        this.slideOpts = {
          slidesPerView: 9.3,
          freeMode: true,
          spaceBetween: -10
        }
      
        break;
      case width <= this.desktopBpPx && width >= this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 6.3,
          freeMode: true,
          spaceBetween: -10
        }
      
        break;

      case width <  this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 3.3,
          freeMode: true,
          spaceBetween: -10
        }
      
        break;
    
      default:
        break;
    }
   
    
  }

}
