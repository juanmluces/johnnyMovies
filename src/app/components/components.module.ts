import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { MovieDetailModal } from './movie-detail/movie-detail.modal';
import { TranslateModule } from '@ngx-translate/core';
import { PersonDetailModal } from './person-detail/person-detail.component';



@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    MovieDetailModal,
    PersonDetailModal
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    MovieDetailModal,
    PersonDetailModal
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule
  ]
})
export class ComponentsModule { }
