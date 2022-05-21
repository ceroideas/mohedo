import { Injectable } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  constructor(public nav: NavController, public alertCtrl: AlertController) { }

  panic()
  {
  	this.alertCtrl.create({header:"¿Seguro que desea cerrar?",
  		// message: "No se guardará ninguna información de esta sesión.",
  		buttons:[
  		{
  			text:"Continuar"
  		},
  		{
  			text:"Sí, seguro",
  			handler: ()=>{this.nav.navigateRoot('login')}
  		}/*,{
  			text: "Continuar más tarde",
  			handler: ()=>{navigator['app'].exitApp(); }
  		},,{
  			text: "No me interesa esta app",
  			handler: ()=>{
  				localStorage.clear();
  				navigator['app'].exitApp();
  			}
  		}*/]
  	}).then(a=>{
  			a.present();
  	})
  }
}
