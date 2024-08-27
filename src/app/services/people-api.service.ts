import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { PersonDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PeopleApiService {
  private url = environment.url;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  getActorDetail(actorId: number): Promise<PersonDetail> {
    const lang = this.translate.currentLang;
    const url = `${this.url}person/${actorId}?api_key=${this.apiKey}&language=${lang}&append_to_response=movie_credits,images`;
    return this.http.get<PersonDetail>(url).toPromise();
  }
}
