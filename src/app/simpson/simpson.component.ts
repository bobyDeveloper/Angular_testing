import { Component } from '@angular/core';

@Component({
  selector: 'app-simpson',
  template: '',  
  styleUrls: []   
})
export class ComponenteSimpson {

  // Método para integrar una función usando la regla de Simpson
  integrar(funcion: (x: number) => number, a: number, b: number, numSegmentos: number): number {
    let w: number = (b - a) / numSegmentos; // Ancho de segmento

    let resultado: number = funcion(a) + funcion(b); // F(0) + F(x)

    for (let i = 1; i < numSegmentos; i++) {
      if (i % 2 === 0) {
        resultado += 2 * funcion(a + i * w); // Multiplicador 2 para i par
      } else {
        resultado += 4 * funcion(a + i * w); // Multiplicador 4 para i impar
      }
    }

    return (w / 3) * resultado;
  }

  // Función factorial (sin recursividad)
  factorial(n: number): number {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // Función Gamma (sin recursividad)
  gamma(z: number): number {
    if (Number.isInteger(z)) {
      return this.factorial(z - 1);
    }
    let product = Math.sqrt(Math.PI);
    while (z > 0.5) {
      z -= 1;
      product *= z;
    }
    return product;
  }

  tDistribution(t: number, dof: number): number {
    const numerator = this.gamma((dof + 1) / 2);
    const denominator = Math.sqrt(dof * Math.PI) * this.gamma(dof / 2);
    return (numerator / denominator) * (1 / (1 + t * t / dof) ** ((dof + 1) / 2));
  }
}