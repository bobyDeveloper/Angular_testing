import { factorial } from './factorial';

describe('factorial', () => {
    it('should return 0 if x is negative', () => {
        const result = factorial(-1);
        expect(result).toBe(0);
    });

    it('should return 1 if x is 0', () => {
        const result = factorial(0);
        expect(result).toBe(1);
    });

    it('should return 2 if x is 2', () => {
        const result = factorial(2);
        expect(result).toBe(2);
    });

    it('should return 6 if x is 3', () => {
        const result = factorial(3);
        expect(result).toBe(6);
    });

    it('should return 24 if x is 4', () => {
        const result = factorial(4);
        expect(result).toBe(24);
    });

    it('should return 120 if x is 5', () => {
        const result = factorial(5);
        expect(result).toBe(120);
    });

    it('should return 0 if x > 15', () => {
        const result = factorial(16);
        expect(result).toBe(0);
    });
});

