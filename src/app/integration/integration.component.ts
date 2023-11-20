import { Component } from '@angular/core';
import { ComponenteSimpson } from '../simpson/simpson.component';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
  activeCalculation: '1a' | '3a' | '5a' | null = null;
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
