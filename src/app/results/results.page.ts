import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ApiService } from '../services/api.service';
import { EventsService } from '../services/events.service';
import { PanicService } from '../services/panic.service';

import {TranslateService} from '@ngx-translate/core';

declare var moment:any;

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  @ViewChild('barChart',{static:false}) barChart;
  @ViewChild('barChartDay',{static:false}) barChartDay;

  bars: any;
  colorArray: any;

  painLevel = [];
  time = [];
  days = [];
  percent = [];

  totalElements:any = [];

  loaded = false;

  day = false;
  thisDay = "";

  showMessages = false;
  showSkeleton = true;

  title;

  general = true;
  barday = false;

  generalSelected = null;
  bardaySelected = null;
  dayElementSelected = null;

  constructor(public api: ApiService, public nav: NavController, public panic: PanicService, public translate: TranslateService, public events: EventsService) {
    this.title = this.translate.instant('RESULTS.res_tr_1_0');
  }

  ngOnInit() {
  	
  }

  exit()
  {
    this.panic.panic();
  }

  hoy = false;

  getStatistics(t = 0) {

    this.loaded = true;

    let id;

    if (localStorage.getItem('medico')) {
      id = localStorage.getItem('user_id');
    }else{
      id = JSON.parse(localStorage.getItem('mohedoUser'))['id'];
    }
    

  	this.api.getStatistics(id,t).subscribe((data:any)=>{

      this.showSkeleton = false;

      let element:any = [];

      if (t == 0) {

        this.hoy = true;

        for (let i in data) {

          let overel = data[i];

          let allElements:any = [];

          for (var j in overel) {
            
            let allPain = 0;

            let finalTime = 0;

            let allTime = 0;
            let allPercent:any = 0;

            let el = overel[j];

            allPain+=parseInt(el.pain);

            let answers = JSON.parse(el.answers);

            let total = answers.length;
            let aciertos = 0;
            let fallos = 0;

            for (let k of answers) {
                allTime+=parseFloat(k.time);
                // allPercent+=(k.user == k.answer ? 1 : 0);
                if(k.user == k.answer)
                {
                  aciertos++;
                }else{
                  fallos++;
                }
            }
            allPercent = ((100*aciertos)/total).toFixed(2);

            el.date = moment(el.created_at).format('DD-MM-Y');
            el.hour = moment(el.created_at).format('HH:mm');

            let mmd = el.min_max_data;
            finalTime = 100+((0-100)/(mmd.min_time - mmd.max_time)*(allTime - mmd.max_time));
            console.log(finalTime);
            finalTime = finalTime > 100 ? 100 : (finalTime < 0 ? 0 : finalTime);

            allElements.push(el);
            allElements.date = i;

            this.painLevel.push((allPain /*/ allElements.length*/));

            this.time.push((finalTime.toFixed(2) /*/ allElements.length*/));
            // this.days.push(moment(i).format('DD-MMM'));
            this.days.push(el.hour);
            this.percent.push((allPercent /*/ allElements.length*/)*1);
          }

          element.push(allElements);
        }

      }else{
        this.hoy = false;

    		for (let i in data) {

    			let overel = data[i];

          let allPain = 0;
          let allTime = 0;

          let finalTime = 0;

          let allPercent = 0;
          let allElements:any = [];

          for (var j in overel) {

            let el = overel[j];

            allPain+=parseInt(el.pain);

            let answers = JSON.parse(el.answers);

            let total = answers.length;
            let aciertos = 0;
            let fallos = 0;

            for (let k of answers) {
                allTime+=parseFloat(k.time);
                // allPercent+=(k.user == k.answer ? 1 : 0);
                if(k.user == k.answer)
                {
                  aciertos++;
                }else{
                  fallos++;
                }
            }
            allPercent = (100*aciertos)/total;

            el.date = moment(el.created_at).format('DD-MM-Y');
            el.hour = moment(el.created_at).format('HH:mm');

            allElements.push(el);

            let mmd = el.min_max_data;

            finalTime = 100+((0-100)/(mmd.min_time - mmd.max_time)*(allTime - mmd.max_time));

            finalTime = finalTime > 100 ? 100 : (finalTime < 0 ? 0 : finalTime);
          }

          allElements.date = i;

          console.log(i);

          element.push(allElements);

    			this.painLevel.push((allPain / allElements.length));

  		    this.time.push( (finalTime / allElements.length).toFixed(2) );
  		    this.days.push(moment(i).format('DD-MMM'));
  		    this.percent.push( ((allPercent / allElements.length)*1).toFixed(2) );

    		}
      }

      if (element.length > 0) {
		    this.totalElements.push(element);
      }

      console.log(this.totalElements.length)

  		this.createBarChart();
  	})
  }

  ionViewDidEnter() {
    if (!this.loaded) {
  	  this.getStatistics();
    }
  }

  labels = []

  createBarChart() {

    console.log('bar chart', this.days, this.time, this.painLevel)

    this.showMessages = true;

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [
        {
          label: this.translate.instant('RESULTS.res_tr_8'),
          data: this.percent,
          fill:false,
          borderColor: '#3b96d3',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        },
        {
          label : this.translate.instant('RESULTS.res_tr_6'),
          data: this.time,
          fill:false,
          borderColor: '#66b678',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        },{
          label: this.translate.instant('RESULTS.res_tr_7'),
          data: this.painLevel,
          fill:false,
          borderColor: '#ff273a',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        }]
      },
      options: {
        legend: {
          position: 'bottom',
          display: false
        },
        layout: {
          padding: {
            top: 20
          }
        },
        tooltips: {
         callbacks: {
          label: function(v,d) {
            if (v.datasetIndex == 2) {
              return d.datasets[v.datasetIndex].label+': '+(v.value/10).toFixed(2);
            }
            else if (v.datasetIndex == 0) {
              return d.datasets[v.datasetIndex].label+': '+(v.value)+'%';
            }else{
              return d.datasets[v.datasetIndex].label+': '+(v.value);
            }
          }
         }
        },
        scales: {
          y: {

          },
          yAxes: [{
            ticks: {
              max:100,
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  viewDay(element)
  {
    this.dayElementSelected = element;

    this.general = false;
    this.barday = true;

    this.day = true;

    this.thisDay = element.date;

    this.days = [];
    this.time = [];
    this.painLevel = [];
    this.percent = [];

    console.log(element);

    for (let i in element)
    {
      if (i != 'date') {
        let el = element[i];
        let allPain = 0;
        let allTime = 0;

        let finalTime = 0;

        let allPercent = 0;

        let answers = JSON.parse(el.answers);

        let total = answers.length;
        let aciertos = 0;
        let fallos = 0;

        for (let k of answers) {
            allTime+=parseFloat(k.time);
            // allPercent+=(k.user == k.answer ? 1 : 0);
            if(k.user == k.answer)
            {
              aciertos++;
            }else{
              fallos++;
            }
        }
        allPercent = (100*aciertos)/total;

        let mmd = el.min_max_data;
        finalTime = 100+((0-100)/(mmd.min_time - mmd.max_time)*(allTime - mmd.max_time));
        finalTime = finalTime > 100 ? 100 : (finalTime < 0 ? 0 : finalTime);

        this.painLevel.push(el.pain);

        this.time.push(finalTime.toFixed(2));
        this.days.push(el.hour);
        this.percent.push((allPercent)*1).toFixed(2);
      }
    }

    console.log(this.painLevel);

    setTimeout(()=>{
      this.bars = new Chart(this.barChartDay.nativeElement, {
        type: 'bar',
        data: {
          labels: this.days,
          datasets: [
          {
            label: this.translate.instant('RESULTS.res_tr_8'),
            data: this.percent,
            fill:false,
            borderColor: '#3b96d3',
            type: 'line',
            pointStyle: 'crossRot',
            pointBorderWidth: 24,
            hoverBorderWidth: 24
          },{
            label: this.translate.instant('RESULTS.res_tr_6'),
            data: this.time,
            fill:false,
            borderColor: '#66b678',
            type: 'line',
            pointStyle: 'crossRot',
            pointBorderWidth: 24,
            hoverBorderWidth: 24
          },{
            label: this.translate.instant('RESULTS.res_tr_7'),
            data: this.painLevel,
            fill:false,
            borderColor: '#ff273a',
            type: 'line',
            pointStyle: 'crossRot',
            pointBorderWidth: 24,
            hoverBorderWidth: 24
          }]
        },
        options: {
          legend: {
            position: 'bottom',
            display: false
          },
          layout: {
            padding: {
              top: 20
            }
          },
          tooltips: {
           callbacks: {
            label: function(v,d) {
              // console.log(v,d);
              if (v.datasetIndex == 2) {
                return d.datasets[v.datasetIndex].label+': '+(v.value/10).toFixed(2);
              }
              else if (v.datasetIndex == 0) {
                return d.datasets[v.datasetIndex].label+': '+(v.value)+'%';
              }else{
                return d.datasets[v.datasetIndex].label+': '+(v.value);
              }
            }
           }
          },
          scales: {
            yAxes: [{
              ticks: {
                max:100,
                beginAtZero: true
              }
            }]
          }
        }
      });
      console.log(element)
    },100)
  }

  viewResults(item)
  {
  	console.log(item);
  	localStorage.setItem('report',JSON.stringify(item));
  	this.nav.navigateForward('report2');
  }

  loadResults(i)
  {

    this.generalSelected = null;

    this.general = true;
    this.barday = false;

    this.title = this.translate.instant('RESULTS.res_tr_1_'+i);
    this.day = false;

  	this.days = [];
  	this.time = [];
  	this.painLevel = [];
  	this.percent = [];
  	this.totalElements = [];
    this.showMessages = false;
  	this.getStatistics(i);
  }

  goToPain()
  {
    setTimeout(()=>{
      this.events.publish('goToPain');
    },100)
  }


  /**/

  filterGeneral(t)
  {
    if (this.generalSelected == t) {
      
      this.generalSelected = null;
      this.createBarChart();

    }else{
      
      this.generalSelected = t;

      let dataset;
      if (t == 'percent') {
        dataset = {
          label: this.translate.instant('RESULTS.res_tr_8'),
          data: this.percent,
          fill:false,
          borderColor: '#3b96d3',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }else if(t == 'time') {
        dataset = {
          label : this.translate.instant('RESULTS.res_tr_6'),
          data: this.time,
          fill:false,
          borderColor: '#66b678',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }else if(t == 'painLevel') {
        dataset = {
          label: this.translate.instant('RESULTS.res_tr_7'),
          data: this.painLevel,
          fill:false,
          borderColor: '#ff273a',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }

      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.days,
          datasets: [
            dataset
          ]
        },
        options: {
          legend: {
            position: 'bottom',
            display: false
          },
          layout: {
            padding: {
              top: 20
            }
          },
          tooltips: {
           callbacks: {
            label: function(v,d) {
              if (t == 'painLevel') {
                return d.datasets[v.datasetIndex].label+': '+(v.value/10).toFixed(2);
              }
              else if (t == 'percent') {
                return d.datasets[v.datasetIndex].label+': '+(v.value)+'%';
              }else{
                return d.datasets[v.datasetIndex].label+': '+(v.value);
              }
            }
           }
          },
          scales: {
            y: {

            },
            yAxes: [{
              ticks: {
                max:100,
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    //
  }

  filterDay(t)
  {
    if (this.bardaySelected == t) {
      
      this.bardaySelected = null;
      this.viewDay(this.dayElementSelected);

    }else{
      
      this.bardaySelected = t;

      let dataset;
      if (t == 'percent') {
        dataset = {
          label: this.translate.instant('RESULTS.res_tr_8'),
          data: this.percent,
          fill:false,
          borderColor: '#3b96d3',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }else if(t == 'time') {
        dataset = {
          label : this.translate.instant('RESULTS.res_tr_6'),
          data: this.time,
          fill:false,
          borderColor: '#66b678',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }else if(t == 'painLevel') {
        dataset = {
          label: this.translate.instant('RESULTS.res_tr_7'),
          data: this.painLevel,
          fill:false,
          borderColor: '#ff273a',
          type: 'line',
          pointStyle: 'crossRot',
          pointBorderWidth: 24,
          hoverBorderWidth: 24
        };
      }

      this.bars = new Chart(this.barChartDay.nativeElement, {
        type: 'bar',
        data: {
          labels: this.days,
          datasets: [
            dataset
          ]
        },
        options: {
          legend: {
            position: 'bottom',
            display: false
          },
          layout: {
            padding: {
              top: 20
            }
          },
          tooltips: {
           callbacks: {
            label: function(v,d) {
              if (t == 'painLevel') {
                return d.datasets[v.datasetIndex].label+': '+(v.value/10).toFixed(2);
              }
              else if (t == 'percent') {
                return d.datasets[v.datasetIndex].label+': '+(v.value)+'%';
              }else{
                return d.datasets[v.datasetIndex].label+': '+(v.value);
              }
            }
           }
          },
          scales: {
            y: {

            },
            yAxes: [{
              ticks: {
                max:100,
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    //
  }


}
