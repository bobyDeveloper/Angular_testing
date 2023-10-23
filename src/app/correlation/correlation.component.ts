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

//Calculo de los datos

  calculate = new Calculate();
  calculos() {
    if (
      this.dataTest.x.length == this.dataTest.y.length &&
      this.dataTest.x.length != 0
    ) {
      this.n = this.dataTest.x.length;
      this.sumaX = this.calculate.sumX(this.dataTest.x);
      this.sumaY = this.calculate.sumX(this.dataTest.y);
      this.sumaXY = this.calculate.sumXY(this.dataTest.x, this.dataTest.y);
      this.sumaXCuadrada = this.calculate.sumXX(this.dataTest.x);
      this.sumaYCuadrada = this.calculate.sumXX(this.dataTest.y);
    }
  }

//Obtener los datos de la API

  getData(option: number) {
    switch (option) {
      case 1:
        this.service.getData1().subscribe((data) => {
          this.dataTest.x = data.proxy_size;
          this.dataTest.y = data.actual_add;
        });
        break;
      case 2:
        this.service.getData2().subscribe((data) => {
          this.dataTest.x = data.proxy_size;
          this.dataTest.y = data.actual_develop;
        });
        break;
      case 3:
        this.service.getData3().subscribe((data) => {
          this.dataTest.x = data.plan_added;
          this.dataTest.y = data.actual_added;
        });
        break;
      case 4:
        this.service.getData4().subscribe((data) => {
          this.dataTest.x = data.plan_added;
          this.dataTest.y = data.actual_develop;
        });
        break;
    }
  }

//Calculo de la correlacion

//Calculo de R
  calcularR(): number {
    let r =
      (this.n * this.sumaXY - this.sumaX * this.sumaY) /
      Math.sqrt(
        (this.n * this.sumaXCuadrada - Math.pow(this.sumaX, 2)) *
          (this.n * this.sumaYCuadrada - Math.pow(this.sumaY, 2))
      );
    return r;
  }

//Calculo de R^2

  calcularRCuadrada(): number {
    let r = this.calcularR();
    return r * r;
  }
}
