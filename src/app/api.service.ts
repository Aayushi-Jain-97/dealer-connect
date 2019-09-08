import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Profile } from  './profile';
import { Salesmen } from  './salesmen';
import { Feedback } from  './feedback';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // PHP_API_SERVER = "http://kaveritest.bitnamiapp.com/dc";
  PHP_API_SERVER = "http://127.0.0.1";


  //  headerOptions = new HttpHeaders();
    
  constructor(private httpClient: HttpClient) { }

  readProfiles(): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  selectSalesman(){
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/dealer-profiles/getSalesman.php`);
  }

  selectDepot(){
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/dealer-profiles/getDepot.php`);
  }

  selectRoute(){
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/dealer-profiles/getRoute.php`);
  }

  insertDealer(dealer){
    return this.httpClient.post(`${this.PHP_API_SERVER}/api/dealer-profiles/insert.php`,dealer);
  }

  viewDealer(id){
    const params = new HttpParams().set('id', id);
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/dealer-profiles/viewDealer.php`, {params:params});
  }
  getTotalRewards(id){
    const params = new HttpParams().set('id', id);
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/dealer-profiles/rewards.php`, {params:params});
  }

  editDealer(dealer){
    return this.httpClient.put(`${this.PHP_API_SERVER}/api/dealer-profiles/editDealer.php`, dealer);
  }
  readSalesmenProfiles(): Observable<Salesmen[]>{
    return this.httpClient.get<Salesmen[]>(`${this.PHP_API_SERVER}/api/salesmen-profiles/read.php`);
  }
  editSalesmenProfile(salesmen){
    return this.httpClient.put(`${this.PHP_API_SERVER}/api/salesmen-profiles/edit.php`, salesmen);
  }
  insertSalesmenProfile(salesmen){
    return this.httpClient.post(`${this.PHP_API_SERVER}/api/salesmen-profiles/insert.php`, salesmen);
  }
  getFeedback(): Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(`${this.PHP_API_SERVER}/api/feedback/getFeedback.php`);
  }
}
