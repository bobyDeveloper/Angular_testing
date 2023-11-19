import { Component } from '@angular/core';
// Importa cualquier clase o servicio necesario para los cálculos

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
  activeCalculation: '1a' | '3a' | '5a' | null = null;

  setActiveCalculation(calculation: '1a' | '3a' | '5a') {
    this.activeCalculation = calculation;
  }

  // Aquí puedes agregar los métodos para realizar los cálculos
}


