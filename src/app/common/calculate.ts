import { calcularMedia } from '../media/media.component'; // Importar la función calcularMedia
import { ComponenteSimpson } from '../simpson/simpson.component';

export class Calculate extends ComponenteSimpson {

    static sumX(lista: number[]): number {
        return lista.reduce((sum, current) => sum + current, 0);
      }
    
      static sumXX(lista: number[]): number {
        return lista.reduce((sum, current) => sum + current * current, 0);
      }
    
      static sumXY(listaX: number[], listaY: number[]): number {
        return listaX.reduce((sum, current, i) => sum + current * listaY[i], 0);
      }
    
      static calculateB1(sumXY: number, sumX: number, sumY: number, sumXX: number, n: number): number {
        return ((n * sumXY) - (sumX * sumY)) / ((n * sumXX) - (sumX * sumX));
      }
    
      static calculateB0(sumX: number, sumY: number, b1: number, n: number): number {
        return (sumY - (b1 * sumX)) / n;
      }
    
      static calculateY(b0: number, b1: number, x: number): number {
        return b0 + (b1 * x);
      }
    
      static calculateMedia(lista: number[]): number {
        return calcularMedia(lista); // Asegúrate de que esta función sea exportable desde media.component.ts
      }
}