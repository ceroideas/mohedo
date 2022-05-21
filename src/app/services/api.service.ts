import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	url;
	baseUrl;

  type = 1; // 1 'ADOPEC' - 2 'UMA' - 3 'GENERAL'

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://ceroideas.es/mohedo/public/';
  	this.url = this.baseUrl+'api/';
  }

  login(data)
  {
    return this.http.post(this.url+'login',data);
  }
  loadQuestions(s,l)
  {
  	return this.http.get(this.url+'loadQuestions/'+s+'/'+l);
  }
  validateNameEmail(data)
  {
    return this.http.post(this.url+'validateNameEmail',data);
  }
  register(data)
  {
    return this.http.post(this.url+'register',data);
  }
  saveReport(data)
  {
    return this.http.post(this.url+'saveReport',data);
  }
  loadImages(s,l)
  {
    return this.http.get(this.url+'loadImages/'+s+'/'+l);
  }

  getStatistics(id,type = 0)
  {
    return this.http.get(this.url+'getStatistics/'+id+'/'+type);
  }

  saveUserData(data)
  {
    let id = JSON.parse(localStorage.getItem('mohedoUser'))['id'];
    return this.http.post(this.url+'saveUserData/'+id,data);
  }

  getPacients()
  {
    let id = JSON.parse(localStorage.getItem('mohedoUser'))['reference'];
    return this.http.get(this.url+'getPacients/'+id);
  }

  sendCode(data)
  {
    return this.http.post(this.url+'sendCode',data);
  }

  changePassword(data)
  {
    return this.http.post(this.url+'changePassword',data);
  }

  testing()
  {
    return this.http.get(this.url+'testing');
  }


  /**/

  registerTest(data)
  {
    return this.http.post(this.url+'registerTest',data);
  }
  validateNameEmailTest(data)
  {
    return this.http.post(this.url+'validateNameEmailTest',data);
  }
  loadQuestionsTest(s,l)
  {
    return this.http.get(this.url+'loadQuestionsTest/'+s+'/'+l);
  }
  loadImagesTest(s)
  {
    return this.http.get(this.url+'loadImagesTest/'+s);
  }
  saveReportTest(data)
  {
    return this.http.post(this.url+'saveReportTest',data);
  }
}
