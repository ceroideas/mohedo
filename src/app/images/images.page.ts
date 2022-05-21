import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

declare var moment:any;

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  images:any = [];
  start = 0;

  answers = [];

  actual;

  actualMoment;
  user = JSON.parse(localStorage.getItem('mohedoUser'));

  constructor(public alert: AlertController, public api: ApiService, public nav: NavController, public loadingCtrl: LoadingController) {
    localStorage.setItem('begin','1');
  }

  ngOnInit() {
  	this.api.loadImagesTest(localStorage.getItem('sex')).subscribe(data=>{
  		this.images = data;
  		if (this.images.length > 0) {
        if (localStorage.getItem('panic')) {
          this.answers = JSON.parse(localStorage.getItem('panic'));
          this.start = this.answers.length;
          this.actual = this.images[this.answers.length];

          localStorage.removeItem('panicPain');
          localStorage.removeItem('panic');
        }else{
  			  this.actual = this.images[0];
        }
  		}else{
        return this.nav.pop();
      }
  	})
    this.actualMoment = moment();
  }

  panic()
  {
    this.alert.create({message:"¿Desea salir de la sesión?",buttons:[
      {text:"Si", handler: ()=>{
        this.nav.navigateRoot('login');
      }},
      {text:"Cancelar", handler: ()=>{

      }}
      ]}).then((a)=>{
        a.present();
      })
  }

  changeImage(side)
  {
    let time = moment().diff(this.actualMoment,'miliseconds');
    let item = {user:side, image_id: this.images[this.start].id,answer:this.images[this.start].side,time:(time/=1000).toFixed(2)};
    this.answers.push(item);

  	console.log(item);

  	if (this.start == this.images.length-1) {

      this.loadingCtrl.create().then(l=>{
        l.present();
        console.log(this.answers);

        let percent = 0;

        for (let i of this.answers) {
          percent+=(i.user == i.answer ? 1 : 0);
        }

        console.log(percent);
        percent*=10;
        console.log(percent);

        let report = {user_id:this.user.id,level:this.user.level,pain:localStorage.getItem('pain'),answers:this.answers,percent:percent};

        this.api.saveReportTest(report).subscribe(data=>{
          l.dismiss();
          console.log(data);
          localStorage.setItem('mohedoUser',JSON.stringify(data[0]));
          localStorage.setItem('report',JSON.stringify(data[1]));

          localStorage.setItem('message',data[2]);

    		  return this.nav.navigateRoot('report');
        })
        /**/
      })
  	}else{ 
    	this.actual = this.images[this.start+=1];
      this.actualMoment = moment();
    }

  }

}
