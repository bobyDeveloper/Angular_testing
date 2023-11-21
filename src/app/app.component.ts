import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeCalculation: '1a' | '3a' | '5a' | null = null; // comienza sin ninguna selección

  setActiveCalculation(calculation: '1a' | '3a' | '5a') {
    this.activeCalculation = calculation;
  }
}
