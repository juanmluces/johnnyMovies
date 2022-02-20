import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonDetail } from 'src/app/interfaces/interfaces';
import { PeopleApiService } from 'src/app/services/people-api.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.modal.html',
  styleUrls: ['./person-detail.modal.scss'],
})
export class PersonDetailModal implements OnInit {

  @Input()id: number;
  person: PersonDetail;
  oculto: boolean = true;
  limiteOculto = 150;
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: false,
  }
  pageLoaded: boolean = false;
  selectedUrl: string;
  showSpinner: boolean = false;

  constructor(private modalCtrl: ModalController, private peoples: PeopleApiService) { }


  async ngOnInit() {
    this.showSpinner = true;
    await this.getPersonDetail()
    this.showSpinner = false;
    await this.modalCtrl.dismiss(null, null, 'movie-detail').catch(err => {})
    
  }

  ionViewDidEnter() {
    this.pageLoaded = true;
  }


  async getPersonDetail(){
    const detail = await this.peoples.getActorDetail(this.id);
    if(!detail || detail.status_code) this.modalCtrl.dismiss();
    this.person = detail;
    this.selectedUrl = this.person.profile_path;
    console.log(detail);
    
  }

  selectImage(url: string){
    this.selectedUrl = url;
  }

  goToHomepage(){
    console.log(this.person.homepage)
  }

  viewImage(imagePath: string){
    console.log({imagePath});
    
  }

  regresar(){
    this.modalCtrl.dismiss(true)
  }

}
