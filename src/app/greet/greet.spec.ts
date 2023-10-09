import { greet } from './greet'; // Asegúrate de importar la función greet desde el archivo correspondiente

describe('greet', () => {
    it('should include the name in the message', () => {
        const name = 'bobyDeveloper';
        const message = greet(name);
        expect(message).toContain(name); // Verifica que el mensaje contenga el nombre
    });
});
