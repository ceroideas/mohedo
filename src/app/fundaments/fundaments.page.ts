import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PanicService } from '../services/panic.service';

@Component({
  selector: 'app-fundaments',
  templateUrl: './fundaments.page.html',
  styleUrls: ['./fundaments.page.scss'],
})
export class FundamentsPage implements OnInit {

  active;
  begin;

  sex = "";

  constructor(public nav: NavController, public panic: PanicService) {
    this.sex = localStorage.getItem('sex');
  }

  ngOnInit() {
  }

  exit()
  {
    this.panic.panic();
  }

  videoEnded()
  {
    this.begin = false;
  }

  verVideo()
  {
    this.begin = true;
  }

  saltar()
  {
    this.begin = null;
  }

  start()
  {
  	if (localStorage.getItem('pain')) {
  		this.nav.navigateRoot('begin');
  	}else{
  		this.nav.navigateRoot('pain');
  	}
  }

}
