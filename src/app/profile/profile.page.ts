import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';

import { ConfirmedValidator } from '../register/confirmed.validator';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;

  validations_form2: FormGroup;
  errorMessage: string = '';
  validation_messages2: any;

  professional = false;

  user = JSON.parse(localStorage.getItem('mohedoUser'));

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public translate: TranslateService) {
  	if (this.user.reference) {
  		this.professional = true;
  	}
  }

  ngOnInit() {
  	this.validation_messages = {
      'name': [
        { type: 'required', message: this.translate.instant("PROFILE.prf_tr_12")},
        { type: 'minlength', message: this.translate.instant("PROFILE.prf_tr_13") }
      ],
      'password': [
        { type: 'required', message: this.translate.instant("PROFILE.prf_tr_14")},
        { type: 'minlength', message: this.translate.instant("PROFILE.prf_tr_15") }
      ],
      'repeat_password': [
        { type: 'required', message: this.translate.instant("PROFILE.prf_tr_16")},
        { type: 'confirmedValidator', message: this.translate.instant("PROFILE.prf_tr_17")},
      ],
      'email': [
        { type: 'required', message: this.translate.instant("PROFILE.prf_tr_18")},
        { type: 'pattern', message: this.translate.instant("PROFILE.prf_tr_19") }
      ],
      'code' : []
    };

    this.validations_form = this.formBuilder.group({
      name: new FormControl(this.user.name),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        // Validators.required
      ])),
      repeat_password: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      code: new FormControl(this.user.reference),
    },{
    	validator: ConfirmedValidator('password', 'repeat_password')
    });
  }

  saveUserData(value)
  {
  	if (!this.professional) {
  		value.code = null;
  	}
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.saveUserData(value).subscribe(data=>{
        a.dismiss();
        this.navCtrl.pop();
        localStorage.setItem('mohedoUser',JSON.stringify(data));
        this.alertCtrl.create({message:this.translate.instant("PROFILE.prf_tr_20")}).then(a=>{a.present();});
      },err=>{
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
        a.dismiss();
      })
    })
  }

  changeProf(e)
  {
    this.professional = e.detail.checked;
  }

}
