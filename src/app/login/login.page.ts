import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  validation_messages: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public translate: TranslateService) { }

  ngOnInit() {
    localStorage.removeItem('medico');
    localStorage.removeItem('mohedoUser');
  	this.validation_messages = {
      'name': [
        { type: 'required', message: this.translate.instant("VD.user.required")},
      ],
      'password': [
        { type: 'required', message: this.translate.instant("VD.password.required")},
        { type: 'minlength', message: this.translate.instant("VD.password.min")},
        { type: 'pattern', message: this.translate.instant("VD.password.valid") }
      ]
    };

    this.validations_form = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[0-9]){1})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        Validators.required
      ])),
    });
  }

  loginUser(value)
  {
  	console.log(value);
  	
  	this.loadingCtrl.create().then((a)=>{
  		a.present();

	  	this.api.login(value).subscribe(data=>{

        if (data['profile']) {
          localStorage.setItem('sex',data['profile']['sex']);
        }else{
          localStorage.setItem('medico','1');
        }
	  	  // localStorage.setItem('rememberFF',value.email);
	  	  localStorage.setItem('mohedoUser',JSON.stringify(data));
          this.navCtrl.navigateRoot('home');
	      a.dismiss();
	  	},err=>{
	  		console.log(err);
	  	  var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
	      a.dismiss();
	  	})
  	})
  }

}
