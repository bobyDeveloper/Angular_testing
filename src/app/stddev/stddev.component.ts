import { Component, OnInit } from '@angular/core';
import { StddevService } from '../services/stddev.service';
import { calcularMedia } from '../media/media.component'; // Importar la función calcularMedia


@Component({
  selector: 'app-stddev',
  template: ''
})
export class StddevComponent implements OnInit {
  proxySizeStdDev: number = 0;
  devHoursStdDev: number = 0;

  constructor(private stddevService: StddevService) {}

  ngOnInit() {
    this.calculateProxySizeStandardDeviation();
    this.calculateDevHoursStandardDeviation();
  }

  calculateProxySizeStandardDeviation() {
    this.stddevService.getProxySize().subscribe(data => { 
      const mean = calcularMedia(data);
      this.proxySizeStdDev = this.calcularDesviacionEstandar(data, mean);
    });
  }

  calculateDevHoursStandardDeviation() {
    this.stddevService.getDevHours().subscribe(data => { 
      const mean = calcularMedia(data);
      this.devHoursStdDev = this.calcularDesviacionEstandar(data, mean);
    });
  }

  calcularDesviacionEstandar(data: number[], mean: number): number {
    const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
    const meanOfSquaredDifferences = calcularMedia(squaredDifferences); // Usar la función calcularMedia
    const stdDev = Math.sqrt(meanOfSquaredDifferences);
    return stdDev;
  }
}


