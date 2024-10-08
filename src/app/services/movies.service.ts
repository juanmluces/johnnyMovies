import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Genre, PeliculaDetalle, responseVideos, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  private generos: Genre[] = [];

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  private ejecutarQuery<T>(query: string){
    
    const lang = this.translate.currentLang
    query = URL + query;
    query += `&api_key=${apiKey}&language=${lang}&include_image_language=${lang}`;
    return this.http.get<T>(query)

  }


  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString: string;

    if( mes < 10){
      mesString = '0' + mes;
    } else{
      mesString = mes.toString()
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopular(){
    this.popularesPage++;
    const query = 'discover/movie?sort_by=popularity.desc&page=' + this.popularesPage
    return this.ejecutarQuery<RespuestaMDB>(query)
  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`movie/${id}?a=1`)
  }
  getActoresPelicula(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`movie/${id}/credits?a=1`)
  }

  buscarPeliculas( texto: string){
    return this.ejecutarQuery(`search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise(resolve => {
      
          this.ejecutarQuery(`genre/movie/list?a=1`).subscribe(resp => {
            this.generos = resp['genres']
            resolve(this.generos)
          })

    })
  }

  getMovieTrailer(movieId: number): Promise<responseVideos>{
   const lang = this.translate.currentLang
   
    return this.http.get<responseVideos>(`${URL}movie/${movieId}/videos?api_key=${apiKey}&LANGUAGE=${lang}`).toPromise()
  }
}
