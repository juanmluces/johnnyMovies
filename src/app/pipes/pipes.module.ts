import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';
import { SafeURLPipe } from "./safe-url.pipe";
import { DateReadablePipe } from './date-readable.pipe';
import { AgePipe } from './age.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    SafeURLPipe,
    DateReadablePipe,
    AgePipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    SafeURLPipe,
    DateReadablePipe,
    AgePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
