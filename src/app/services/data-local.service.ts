import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Themes } from '../interfaces/enums';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtr: ToastController) {
    this.init();
    this.cargarFavoritos();
   }


  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async presentToast(msg:string, color:string) {
    const toast = await this.toastCtr.create({
      message: msg,
      duration: 500,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje = '';
    let color = '';

    for( const peli of this.peliculas){
      if( peli.id == pelicula.id ){
        existe = true;
        break;
      }
    }
    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id != pelicula.id)
      mensaje = 'Eliminado de favoritos'
      color = 'danger'
    } else{ 
      mensaje = 'Agregado a favoritos'
      color= 'primary';
      this.peliculas.push(pelicula);
    }
    this.presentToast(mensaje, color)
    this._storage.set('peliculas', this.peliculas)
    
    return !existe
  }

  guardarModoOscuro(theme: Themes): Themes{

    this._storage.set('theme', theme)
    return theme

  }

  async recuperarModoOscuro(): Promise<Themes>{
    if(!this._storage) await this.init()
    const theme = await this._storage.get('theme') ?? Themes.LightWhite;
    
    return theme
  }


  async cargarFavoritos(){

    if(!this._storage) await this.init()
    const peliculas  = await this._storage.get('peliculas');
    this.peliculas = peliculas || [];
    return peliculas;

  }

 async  existePelicula(id){

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id == id);
    return (existe) ? true: false;
  }

  guardarMostrarGeneros(mostrarGeneros: boolean){

    this._storage.set('mostrarGeneros', mostrarGeneros)
  }

  async recuperarMostrarGeneros(){
    if(!this._storage) await this.init()
    const mostrarGeneros = await this._storage.get('mostrarGeneros');
    return mostrarGeneros
  }

  async getLang(){
    if(!this._storage) await this.init()
    const lang = await this._storage.get('lang')
    return lang
  }

  guardarIdioma(lang: string){
    this._storage.set('lang', lang)
  }



}
