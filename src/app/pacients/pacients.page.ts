import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.page.html',
  styleUrls: ['./pacients.page.scss'],
})
export class PacientsPage implements OnInit {

  pacients:any = [];
  profile;

  constructor(public api: ApiService, public nav: NavController) { }

  ngOnInit() {
  	this.api.getPacients().subscribe(data=>{
  		this.pacients = data;
  	})
  }

  viewStatistics(id)
  {
    localStorage.setItem('user_id',id.toString());
    this.nav.navigateForward('results');
  }

}
