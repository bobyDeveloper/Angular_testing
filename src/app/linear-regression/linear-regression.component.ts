import { Component, OnInit } from '@angular/core';
import { LinearRegressionService } from '../services/linear-regression.service';
import { Calculate } from '../common/calculate';

@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.css']
})
export class LinearRegressionComponent implements OnInit {
  constructor(private linearRegressionService: LinearRegressionService) { }

  list1: number[] = [];
  list2: number[] = [];
  selectedRouteNumber: number = 1;

  sumX = 0;
  sumY = 0;
  mediaX = 0
  mediaY = 0;
  sumXY = 0;
  sumXX = 0;
  sumYY = 0;
  n = 0;

  calculate = new Calculate();

  ngOnInit(): void {
    this.cargarDatos(this.selectedRouteNumber);
  }

  cargarDatos(routeNumber: number): void {
    switch (routeNumber) {
      case 1:
        this.linearRegressionService.getData1().subscribe((data) => {
          this.list1 = data.proxy_size;
          this.list2 = data.actual_added;
          this.procesarRespuesta(data);
        });
        break;
      case 2:
        this.linearRegressionService.getData2().subscribe((data) => {
          this.list1 = data.proxy_size;
          this.list2 = data.actual_develop;
          this.procesarRespuesta(data);
        });
        break;
      case 3:
        this.linearRegressionService.getData3().subscribe((data) => {
          this.list1 = data.plan_added;
          this.list2 = data.actual_added;
          this.procesarRespuesta(data);
        });
        break;
      case 4:
        this.linearRegressionService.getData4().subscribe((data) => {
          this.list1 = data.plan_added;
          this.list2 = data.actual_develop;
          this.procesarRespuesta(data);
        });
        break;
      default:
        console.error('Número de ruta no válido');
    }
  }
  procesarRespuesta(data: any): void {
    this.sumX = this.calculate.sumX(this.list1);
    this.sumY = this.calculate.sumX(this.list2);
    this.mediaX = this.calculate.calculateMedia(this.list1);
    this.mediaY = this.calculate.calculateMedia(this.list2);

    this.sumXY = this.calculate.sumXY(this.list1, this.list2);
    this.sumXX = this.calculate.sumXX(this.list1);
    this.sumYY = this.calculate.sumXX(this.list2);
    this.n = this.list1.length;
  }

  actualizarDatos(routeNumber: number): void {
    this.cargarDatos(routeNumber);
  }

  calculateB1(): number {
    var b1 = 0;
    b1 = this.calculate.calculateB1(this.sumXY, this.sumX, this.sumY, this.sumXX, this.n);
    return b1;
  }

  calculateB0(): number {
    var b0 = 0;
    b0 = this.calculate.calculateB0(this.sumX, this.sumY, this.calculateB1(), this.n);
    return b0;
  }

  calculateY(x: number): number {
    var y = 0;
    y = this.calculate.calculateY(this.calculateB0(), this.calculateB1(), x);
    return y;
  }
}
