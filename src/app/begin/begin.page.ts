import { Component, OnInit } from '@angular/core';
import { PanicService } from '../services/panic.service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.page.html',
  styleUrls: ['./begin.page.scss'],
})
export class BeginPage implements OnInit {

  begin = null;
  sex = "";

  constructor(public panic: PanicService) {
    this.sex = localStorage.getItem('sex');
    // if (!localStorage.getItem('begin')) {
    //   this.begin = true;
    // }
  }

  videoEnded()
  {
    this.begin = false;
  }

  ngOnInit() {
  }

  exit()
  {
  	this.panic.panic();
  }

  verVideo()
  {
    this.begin = true;
  }

  saltar()
  {
    this.begin = null;
  }

}
