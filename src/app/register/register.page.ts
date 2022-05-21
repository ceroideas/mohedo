import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';

declare var moment:any;

import { ConfirmedValidator } from './confirmed.validator';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;

  validations_form2: FormGroup;
  errorMessage: string = '';
  validation_messages2: any;

  step = 1;

  data:any = {};

  birthday:any;
  titulation:any;
  weight:any;
  heigth:any;

  questions:any = [];

  professional = false;

  withPain = true;
  param = {value : this.step}

  younger = true;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public translate: TranslateService) { }

  ngOnInit() {
  	this.validation_messages = {
      'name': [
        { type: 'required', message: this.translate.instant("VD.reg_vd_1_1") },
        { type: 'minlength', message: this.translate.instant("VD.reg_vd_2_1") }
      ],
      'email': [
        { type: 'required', message: this.translate.instant("VD.reg_vd_8") },
        { type: 'pattern', message: this.translate.instant("VD.reg_vd_9") }
      ],
      'code' : []
    };

    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    this.validations_form = this.formBuilder.group({
      // name: new FormControl(null, Validators.compose([
      //   Validators.minLength(4),
      //   Validators.required,
      // ])),
      // email: new FormControl(null, Validators.compose([
      //   Validators.required,
      //   Validators.pattern(regexp)
      // ])),
      partner_type: new FormControl(this.api.type == 1 ? null : -1, Validators.compose([
        Validators.required
      ])),
      code_partner: new FormControl((this.api.type == 1 || this.api.type == 3) ? null : -1, Validators.compose([
        Validators.required
      ])),
      concentimiento: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

    /**/

    if (this.api.type == 2) {

      this.validation_messages2 = {
        'birthday': [
          { type: 'required', message: 'required' },
        ],
        'titulation': [
          { type: 'required', message: 'required' },
        ],
      };
      this.validations_form2 = this.formBuilder.group({
        birthday: new FormControl(null, Validators.compose([
          Validators.required,
        ])),
        titulation: new FormControl(null, Validators.compose([
          Validators.required,
        ]))
      });
    }else{
      this.validation_messages2 = {
        'birthday': [
          { type: 'required', message: 'required' },
        ]
      };
      this.validations_form2 = this.formBuilder.group({
        birthday: new FormControl(null, Validators.compose([
          Validators.required,
        ])),
        // pain: new FormControl(1,Validators.compose([
        //   Validators.required
        // ]))
      });
    }
  }

  changeConcentimiento()
  {
    console.log(this.validations_form.value.concentimiento)
    if (this.validations_form.value.concentimiento != true) {
      this.validations_form.patchValue({
        concentimiento: null
      })
    }
  }

  setPain()
  {
    this.validations_form2.patchValue({
      pain: 1
    });
  }

  checkAge()
  {
    if (moment().diff(this.birthday,'years') < 17) {
      this.younger = true;
    }else{
      this.younger = false;
    }
  }

  registerUser(value)
  {
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.validateNameEmailTest(value).subscribe(data=>{
        a.dismiss();
        this.data = value;
        this.step = 2;
        this.param = {value : this.step}
      },err=>{
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
        a.dismiss();
      })
    })
  }

  nextStep(sex)
  {
  	this.data['sex'] = sex;
  	console.log(this.data);

    this.loadingCtrl.create().then(l=>{
      l.present();
    	this.api.loadQuestionsTest(sex,this.translate.getDefaultLang()).subscribe((data:any)=>{
        l.dismiss();
        this.step = 3;
        this.param = {value : this.step}
        if (this.api.type == 1 || this.api.type == 2 || this.api.type == 3) {
    		  this.questions = data;
        }else{
          for (let i = 0; i < data.length; i++) {
            if (i == data.length-1 || i == data.length-2) {
              this.questions.push(data[i]);
            }
          }
        }
    		console.log(this.questions);
    	})
    })
  }

  checkAnswers()
  {
  	let qs = Array.from(document.querySelectorAll('[data-question]'));

  	let answers = [];
  	let punctuation:number = 0;

  	for (var i of qs) {
  		let temp = {};
  		
      temp['question'] = i.querySelector('p').innerText;
  		
  		let opt = [];

      if (i['dataset']['type'] == 'checkbox') {
    		for (var j of Array.from(i.querySelectorAll('[data-option].toggle-checked'))) {
    			opt.push({option:j['dataset']['option'],value:j['value']});
    			punctuation += parseFloat(j['value']);
    		}
      }
      if (i['dataset']['type'] == 'select') {
        if (i.querySelectorAll('ion-select').length > 0) {
          let value = i.querySelectorAll('ion-select')[0].value;

          if (!value) {
            return this.alertCtrl.create({message:this.translate.instant("VD.reg_vd_12")}).then(a=>{a.present()});
          }

          let elem = i.querySelectorAll('ion-select')[0].querySelector('ion-select-option[ng-reflect-value="'+value+'"]');
          if (elem) {
            opt.push({option:elem.textContent,value:value});
            punctuation += parseFloat(value);
          }
        }
      }
      if (i['dataset']['type'] == 'range') {
        if (document.querySelectorAll('ion-range').length > 0) {
          opt.push({option:'range',value:document.querySelectorAll('ion-range')[0].value});
          localStorage.setItem('pain',document.querySelectorAll('ion-range')[0].value.toString());
        }
      }

  		temp['options'] = opt;

  		answers.push(temp);
  	}

    this.data['birthday'] = this.birthday;

    if (moment().diff(this.birthday,'years') < 18) {
      return this.alertCtrl.create({message:this.translate.instant("VD.reg_vd_10")}).then(a=>{a.present()});
    }


    // this.data['weight'] = this.weight;
    // this.data['heigth'] = this.heigth;


    this.data['titulation'] = this.titulation;
    this.data['partner_type'] = this.validations_form.value.partner_type;
    this.data['code_partner'] = this.validations_form.value.code_partner;
    this.data['role_id'] = this.api.type;
    this.data['information'] = JSON.stringify(answers);
    this.data['punctuation'] = punctuation;

    console.log(this.data);

    this.loadingCtrl.create().then(l=>{
      //
      l.present();
      this.api.registerTest(this.data).subscribe(data=>{
        localStorage.setItem('mohedoUser',JSON.stringify(data));
        localStorage.setItem('sex',data['profile']['sex']);
        this.navCtrl.navigateRoot('begin');
        l.dismiss();
        // this.alertCtrl.create({message:this.translate.instant("VD.reg_vd_11")}).then(a=>{a.present()});
        this.alertCtrl.create({message:"Puedes proceder a realizar la sesión"}).then(a=>{a.present()});
      })
      //
    })

  }

  changeProf(e)
  {
    this.professional = e.detail.checked;
  }

}
