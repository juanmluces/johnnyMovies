import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  bestMovies: string[] = ['2001: A Space Odyssey', 'The Godfather', 'Casablanca', 'Citizen Kane', 'Raiders of the Lost Ark', 'Seven Samurai', 'There Will Be Blood', 'Singin\' in the Rain', 'GoodFellas', 'Jaws', 'Star Wars', 'Once Upon a time in the west', 'Alien', 'The Lord of the rings', 'Pulp Fiction', 'Taxi Driver', 'Blade Runner']
  ideas: string[] = []
  textoBuscar ='';
  peliculas: Pelicula[] = []
  buscando: boolean = false;

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private router: Router) {}

  async ngOnInit(){
 
   
      this.shuffle(this.bestMovies)
     this.bestMovies.forEach(movie => {
        if(this.ideas.length < 4){
          this.ideas.push(movie)
        }

        
      });
    
  
    
  }

  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  buscar(event){
    const valor = event.detail.value.trim();
    if(!valor) return this.peliculas = []
    this.buscando = true
    this.moviesService.buscarPeliculas(valor).subscribe(resp =>{
      this.buscando = false
      this.peliculas = resp['results']
        
    });    
  }

  async verDetalle(id:number){
    const modal = await  this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    // this.router.navigateByUrl('/tabs/tab1').then( () => {
    //   this.router.navigateByUrl('/tabs/tab2').then( ()=> {
      
   
        modal.present()

      // })
    // })
  }






}
