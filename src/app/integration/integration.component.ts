import { Component } from '@angular/core';
import { ComponenteSimpson } from '../simpson/simpson.component';
import { calcularMedia } from '../media/media.component';
import { calcularDesviacionEstandar } from '../stddev/stddev.component';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})

export class IntegrationComponent {
  activeCalculation: '1a' | '3a' | '5a' | null = null;
  inputArray: string = '';
  mediaResult: number | null = null;
  stdDevResult: number | null = null;
  fx: string = '';
  x0: string = '';
  x1: string = '';
  numSegmentos: string = '';
  margenError: string = '';
  dof: string = '';
  resultadoSimpson: number | null = null;
  resultadoT: number | null = null;
  componenteSimpson = new ComponenteSimpson();

  setActiveCalculation(calculation: '1a' | '3a' | '5a' | null) {
    this.activeCalculation = calculation;
  }

  calcularMedia(array: number[]): number {
    if (array.length === 0) {
      return 0;
    }
    const sum = array.reduce((acc, num) => acc + num, 0);
    return sum / array.length;
  }

  calcularMediaFromArray() {
    const array = this.inputArray.split(',').map(Number);
    if (array.length === 10) {
      this.mediaResult = calcularMedia(array); // Utiliza calcularMedia importada
    } else {
      alert('Por favor, ingresa exactamente 10 números separados por comas.');
    }
  }

  calcularDesviacion() {
    if (!this.mediaResult) {
      alert('Primero calcula la media.');
      return;
    }
    const array = this.inputArray.split(',').map(Number);
    this.stdDevResult = calcularDesviacionEstandar(array, this.mediaResult);
  }

  calcularDesviacionEstandar(array: number[], media: number): number {
    if (array.length === 0) {
      return 0;
    }
    const sumOfSquares = array.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);
    const variance = sumOfSquares / array.length;
    return Math.sqrt(variance);
  }
  
  calcularSimpson() {
    // Aquí debes convertir la cadena fx en una función real de JavaScript
    // Esto es un ejemplo simple y no seguro, debes buscar una forma segura de hacerlo
    const f = new Function('x', 'return ' + this.fx);
    const x0Number = parseFloat(this.x0);
    const x1Number = parseFloat(this.x1);
    const numSegmentosNumber = parseInt(this.numSegmentos);
    const margenErrorNumber = parseFloat(this.margenError);
    this.resultadoSimpson = this.componenteSimpson.integrar(f as any, x0Number, x1Number, numSegmentosNumber);
  }

  calcularT() {
    // Suponiendo que 't' es un valor que el usuario debe ingresar, añadir otro campo para ello
    // Por ahora, esto calcula la distribución T para t=1, ajusta según sea necesario
    const dofNumber = parseInt(this.dof);
    this.resultadoT = this.componenteSimpson.tDistribution(1, dofNumber);
  }
}
