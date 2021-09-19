import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

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
  @Output() cargarMas = new EventEmitter();
  @Output() modalCreated = new EventEmitter<HTMLIonModalElement>()

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.checkViewport()
  }


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.checkViewport()
  }

  onClick(){
    this.cargarMas.emit()
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
  }

  checkViewport(){
    const width = window.innerWidth
    switch (true) {
      case width > this.desktopBpPx:
        this.slideOpts = {
          slidesPerView: 9.3,
          freeMode: false,
          spaceBetween: -10
        }
      
        break;
      case width <= this.desktopBpPx && width >= this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 6.3,
          freeMode: false,
          spaceBetween: -10
        }
      
        break;

      case width <  this.tabletBreakpointPx:
        this.slideOpts = {
          slidesPerView: 3.3,
          freeMode: false,
          spaceBetween: -10
        }
      
        break;
    
      default:
        break;
    }
   
    
  }

}
