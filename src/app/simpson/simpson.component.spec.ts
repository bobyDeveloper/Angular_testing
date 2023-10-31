import { ComponenteSimpson } from './simpson.component';

describe('ComponenteSimpson', () => {
    let component: ComponenteSimpson;

    beforeEach(() => {
      component = new ComponenteSimpson();
    });

    it('Should return p=16.0 if x0=0, x1=4, num_seg=4 and f(x)=2x', () => {
      const result = component.integrar(x => 2 * x, 0, 4, 4);
      expect(result).toBeCloseTo(16.0, 2);
    });

    it('Should return p=0.3333 if x0=0, x1=1, num_seg=4 and f(x)=x^2', () => {
      const result = component.integrar(x => x * x, 0, 1, 4);
      expect(result).toBeCloseTo(0.3333, 4);
    });

    it('Should return p=1.38 if x0=1, x1=4, num_seg=6 and f(x)=1/x', () => {
      const result = component.integrar(x => 1 / x, 1, 4, 6);
      expect(result).toBeCloseTo(1.3876984126984127, 4);
    });

    it('should return the correct t-distribution probability for x=1.1 and dof=9 and should return p=0.35006', () => {
      const result = component.integrar(t => component.tDistribution(t, 9), 0, 1.1, 100);
      expect(result).toBeCloseTo(0.35006, 5);
    });

    it('should return the correct t-distribution probability for x=1.1812 and dof=10 and should return p=0.36757', () => {
      const result = component.integrar(t => component.tDistribution(t, 10), 0, 1.1812, 100);
      expect(result).toBeCloseTo(0.36757, 5);
    });

    it('should return the correct t-distribution probability for x=2.750 and dof=30 and should return p=0.49500', () => {
      const result = component.integrar(t => component.tDistribution(t, 30), 0, 2.750, 100);
      expect(result).toBeCloseTo(0.49500, 5);
    });
});