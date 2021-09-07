import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';
import { SafeURLPipe } from "./safe-url.pipe";



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    SafeURLPipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    SafeURLPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
