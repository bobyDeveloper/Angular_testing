import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class LinearRegressionService {
// Consumo de Data_Test1.json
  data1 = 'https://media-service-bobydeveloper.cloud.okteto.net/data1';
// Consumo de Data_Test2.json  
  data2 = 'https://media-service-bobydeveloper.cloud.okteto.net/data2';
// Consumo de Data_Test3.json  
  data3 = 'https://media-service-bobydeveloper.cloud.okteto.net/data3';
// Consumo de Data_Test4.json  
  data4 = 'https://media-service-bobydeveloper.cloud.okteto.net/data4';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getData1(): Observable<any> {
    return this.http.get<any>(this.data1, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getData2(): Observable<any> {
    return this.http.get<any>(this.data2, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getData3(): Observable<any> {
    return this.http.get<any>(this.data3, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getData4(): Observable<any> {
    return this.http.get<any>(this.data4, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = 'Fallo al consumir el servicio';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
