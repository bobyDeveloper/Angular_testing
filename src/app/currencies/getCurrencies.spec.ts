import { getCurrencies } from './getCurrencies'; // Asegúrate de importar la función getCurrencies desde el archivo correspondiente

describe('getCurrencies', () => {
    it('should return the supported currencies', () => {
        const currencies = getCurrencies();
        expect(currencies).toContain('USD'); // Verifica que 'USD' esté en la lista de monedas admitidas
        expect(currencies).toContain('EUR'); // Verifica que 'EUR' esté en la lista de monedas admitidas
        // Agrega más expectativas para otras monedas admitidas según tu implementación
    });
});
