import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pain',
  templateUrl: './pain.page.html',
  styleUrls: ['./pain.page.scss'],
})
export class PainPage implements OnInit {

  pain:any = "0";

  withPain:any;

  constructor(public nav: NavController, public alertCtrl: AlertController) { this.pain = "0"}

  ngOnInit() {
    if (localStorage.getItem('panicPain')) {
      localStorage.setItem('pain',localStorage.getItem('panicPain'));
      this.nav.navigateRoot('begin');
    }
  }

  gotoBegin()
  {
  	localStorage.setItem('pain',this.pain);
  	this.nav.navigateForward('begin');
  }

  exit()
  {
    this.alertCtrl.create({header:"¿Seguro que desea cerrar?",
      message: "No se guardará ninguna información de esta sesión.",
      buttons:[{text:"Continuar"},
      {text:"Si, seguro", handler: ()=>{this.nav.navigateRoot('login')}}]}).then(a=>{
        a.present();
    })
  }

}
