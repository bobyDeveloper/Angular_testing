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
  mediaX = 0;
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
    this.linearRegressionService.getData(routeNumber).subscribe(data => {
      if (routeNumber === 1 || routeNumber === 2) {
        this.list1 = data.proxy_size;
      } else {
        this.list1 = data.plan_added;
      }

      if (routeNumber === 1 || routeNumber === 3) {
        this.list2 = data.actual_added;
      } else {
        this.list2 = data.actual_develop;
      }

      this.procesarRespuesta();
    });
  }

  procesarRespuesta(): void {
    this.sumX = Calculate.sumX(this.list1);
    this.sumY = Calculate.sumX(this.list2);
    this.mediaX = Calculate.calculateMedia(this.list1);
    this.mediaY = Calculate.calculateMedia(this.list2);

    this.sumXY = Calculate.sumXY(this.list1, this.list2);
    this.sumXX = Calculate.sumXX(this.list1);
    this.sumYY = Calculate.sumXX(this.list2);
    this.n = this.list1.length;
  }

  actualizarDatos(routeNumber: number): void {
    this.cargarDatos(routeNumber);
  }

  calculateB1(): number {
    return Calculate.calculateB1(this.sumXY, this.sumX, this.sumY, this.sumXX, this.n);
  }

  calculateB0(): number {
    return Calculate.calculateB0(this.sumX, this.sumY, this.calculateB1(), this.n);
  }

  calculateY(x: number): number {
    return Calculate.calculateY(this.calculateB0(), this.calculateB1(), x);
  }
}