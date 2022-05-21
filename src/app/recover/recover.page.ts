import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'
import { ApiService } from '../services/api.service';
import {TranslateService} from '@ngx-translate/core';

import { ConfirmedValidator } from '../register/confirmed.validator';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  validation_messages: any;

  validations_form1: FormGroup;
  validation_messages1: any;

  validations_form2: FormGroup;
  validation_messages2: any;

  step = 1;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public translate: TranslateService, public toast: ToastController) {
  	function makeid() {
      var text = "";
      var possible = "0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    localStorage.setItem('MHcode', makeid());
  }

  ngOnInit() {
    localStorage.removeItem('medico');
    localStorage.removeItem('mohedoUser');

    /*enviar codigo*/
  	this.validation_messages = {
      'email': [
        { type: 'required', message: this.translate.instant("VD.reg_vd_8") },
        { type: 'pattern', message: this.translate.instant("VD.reg_vd_9") }
      ],
    };

    this.validations_form = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      code: new FormControl(localStorage.getItem('MHcode'))
    });

    /*comprobar codigo*/

    this.validation_messages1 = {
      'code': [
        { type: 'required', message: this.translate.instant("VD.code.required")},
      ],
    };

    this.validations_form1 = this.formBuilder.group({
      code: new FormControl(null, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });

    /*cambiar contraseña*/

    this.validation_messages2 = {
       'password': [
        { type: 'required', message: this.translate.instant("VD.reg_vd_3")},
        { type: 'minlength', message: this.translate.instant("VD.reg_vd_4") },
        { type: 'pattern', message: this.translate.instant("VD.reg_vd_5") }
      ],
      'repeat_password': [
        { type: 'required', message: this.translate.instant("VD.reg_vd_6") },
        { type: 'confirmedValidator', message: this.translate.instant("VD.reg_vd_7") },
      ],
    };

    this.validations_form2 = this.formBuilder.group({
      id: new FormControl(null),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        Validators.required
      ])),
      repeat_password: new FormControl(null, Validators.compose([
        Validators.required
      ])),
    },{
    	validator: ConfirmedValidator('password', 'repeat_password')
    });
  }

  sendCode(value)
  {
  	console.log(value);
  	
  	this.loadingCtrl.create().then((a)=>{
  		a.present();

	  	this.api.sendCode(value).subscribe((data:any)=>{

	  		this.validations_form2.patchValue({
	  			id: data.id
	  		})
          this.step = 2;

          this.toast.create({message:'Código enviado al correo',duration: 3000}).then(t=>t.present());
	      a.dismiss();
	  	},err=>{
	  		console.log(err);
	  	  var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        // this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
        this.alertCtrl.create({message:'Usuario no encontrado'}).then(al=>{al.present()});
	      a.dismiss();
	  	})
  	})
  }

  checkCode(value){
  	if (value.code == localStorage.getItem('MHcode')) {
  		this.step = 3;
  	}else{
  		this.alertCtrl.create({message:"El código ingresado no es igual al código enviado, por favor, verifique!"}).then(a=>a.present());
  	}
  }

  changePassword(value)
  {
  	this.loadingCtrl.create().then((a)=>{
  		a.present();

	  	this.api.changePassword(value).subscribe(data=>{

          this.toast.create({message:'Contraseña modificada satisfactoriamente',duration: 3000}).then(t=>t.present());

          this.navCtrl.back();
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
