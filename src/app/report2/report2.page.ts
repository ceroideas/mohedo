import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PanicService } from '../services/panic.service';

declare var moment:any;

@Component({
  selector: 'app-report',
  templateUrl: './report2.page.html',
  styleUrls: ['./report2.page.scss'],
})
export class Report2Page implements OnInit {

  hoy:any = 0;
  hora:any = 0;

  report:any = [];
  pain:any;
  percent:any = 0;
  time:any = 0;

  answers:any;

  constructor(public nav: NavController, public panic: PanicService) {
    

    let rep = localStorage.getItem('report');
    if (rep) {

      this.report = JSON.parse(rep);

      this.pain = (parseInt(this.report.pain)/10).toFixed(1);

      this.hoy = moment(this.report.created_at).format('DD/MM/Y');
      this.hora = moment(this.report.created_at).format('HH:mm');

      this.answers = JSON.parse(this.report.answers);

      let total = this.answers.length;
      let aciertos = 0;
      let fallos = 0;

      for (let i of this.answers) {
        this.time+=parseFloat(i.time);
        if(i.user == i.answer)
        {
          aciertos++;
        }else{
          fallos++;
        }
        // this.percent+=(i.user == i.answer ? 1 : 0);
      }
      // console.log(total,aciertos,fallos);
      this.percent=((100*aciertos)/total).toFixed(2);
      this.time = this.time.toFixed(2);
    }
  }

  ngOnInit() {
  }

  exit()
  {
    this.panic.panic();
  }

}
