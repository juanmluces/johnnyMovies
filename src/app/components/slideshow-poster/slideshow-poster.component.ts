import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  
  tabletBreakpointPx = 900;
  desktopBpPx = 1400;
    
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: false,
  }

  @Input() peliculas: PeliculaDetalle[] = []
  @Input() flexWrap: boolean;
  @Output() modalDismissed = new EventEmitter()
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
      component: DetalleComponent,
      cssClass: 'detallesClass',
      componentProps: {
        id
      }
    });

    modal.present()
    this.modalCreated.emit(modal)
    const result = await modal.onDidDismiss()
    if(result.data) this.modalDismissed.emit()
   
  }

  checkViewport(){
    const width = window.innerWidth
    switch (true) {
      case width > this.desktopBpPx:
        this.slideOpts = {
          slidesPerView: 9.3,
          freeMode: true,
        }
        break;
      case width <= this.desktopBpPx && width >= this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 6.3,
          freeMode: true,
        }
        break;

      case width <  this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 3.3,
          freeMode: true,
        }
        break;
    
      default:
        break;
    }
   
    
  }
  


}
