import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {


    
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: false,
  }

  @Input() peliculas: PeliculaDetalle[] = []
  @Input() flexWrap: boolean;
  @Output() modalDismissed = new EventEmitter()
  @Output() modalCreated = new EventEmitter<HTMLIonModalElement>()


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id:number){
    const modal = await  this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present()
    this.modalCreated.emit(modal)
    const result = await modal.onDidDismiss()
    if(result.data) this.modalDismissed.emit()
   
  }


}
