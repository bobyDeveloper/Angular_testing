import { Component } from '@angular/core';
import { Calculate } from '../common/calculate';
import { LinearRegressionService } from '../services/linear-regression.service';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css'],
})

export class CorrelationComponent {
  constructor(private service: LinearRegressionService) {}

  dataTest = {
    x: [],
    y: [],
  };
  
  sumaXY = 0;
  sumaX = 0;
  sumaY = 0;
  sumaXCuadrada = 0;
  sumaYCuadrada = 0;
  n = 0;

  calculate = new Calculate();

  calculos() {
    if (this.dataTest.x.length === this.dataTest.y.length && this.dataTest.x.length !== 0) {
      this.n = this.dataTest.x.length;
      this.sumaX = Calculate.sumX(this.dataTest.x);
      this.sumaY = Calculate.sumX(this.dataTest.y);
      this.sumaXY = Calculate.sumXY(this.dataTest.x, this.dataTest.y);
      this.sumaXCuadrada = Calculate.sumXX(this.dataTest.x);
      this.sumaYCuadrada = Calculate.sumXX(this.dataTest.y);
    }
  }

  getData(option: number) {
    this.service.getData(option).subscribe((data) => {
      if (option === 1 || option === 2) {
        this.dataTest.x = data.proxy_size;
      } else {
        this.dataTest.x = data.plan_added;
      }

      if (option === 1 || option === 3) {
        this.dataTest.y = data.actual_added;
      } else {
        this.dataTest.y = data.actual_develop;
      }
      
      this.calculos();
    });
  }

  calcularR(): number {
    let r = (this.n * this.sumaXY - this.sumaX * this.sumaY) /
            Math.sqrt(
              (this.n * this.sumaXCuadrada - Math.pow(this.sumaX, 2)) *
              (this.n * this.sumaYCuadrada - Math.pow(this.sumaY, 2))
            );
    return r;
  }

  calcularRCuadrada(): number {
    let r = this.calcularR();
    return r * r;
  }
}