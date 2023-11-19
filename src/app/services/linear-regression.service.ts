import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinearRegressionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private dataUrls: { [key: number]: string } = {
    1: 'https://media-service-bobydeveloper.cloud.okteto.net/data1',
    2: 'https://media-service-bobydeveloper.cloud.okteto.net/data2',
    3: 'https://media-service-bobydeveloper.cloud.okteto.net/data3',
    4: 'https://media-service-bobydeveloper.cloud.okteto.net/data4'
  };

  constructor(private http: HttpClient) { }

  getData(dataNumber: number): Observable<any> {
    const url = this.dataUrls[dataNumber];
    return this.http.get<any>(url, this.httpOptions);
  }
}