import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { PanicService } from '../services/panic.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  medico = false;

  constructor(public nav: NavController, public loadingCtrl: LoadingController, public panic: PanicService, public events: EventsService) {
    if (localStorage.getItem('medico')) {
      this.medico = true;
    }

    this.events.destroy('goToPain');
    this.events.subscribe('goToPain',()=>{
      this.start();
    });
  }

  exit()
  {
  	this.panic.panic();
  }

  gotoFundaments()
  {
  	this.nav.navigateForward('fundaments');
  }

  start()
  {
  	// if (localStorage.getItem('pain')) {
  	// 	this.nav.navigateForward('begin');
  	// }else{
  		this.nav.navigateForward('pain');
  	// }
  }

  profile()
  {
  	this.nav.navigateForward('profile');
  }

  results()
  {
    if (localStorage.getItem('medico')) {
      this.nav.navigateForward('pacients');
    }else{
  	  this.nav.navigateForward('results');
    }
  }


}
