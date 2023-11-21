import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IntegrationComponent } from './integration.component';

describe('IntegrationComponent', () => {
  let component: IntegrationComponent;
  let fixture: ComponentFixture<IntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ IntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate Simpson when button is clicked', () => {
    spyOn(component, 'calcularSimpson');

    component.activeCalculation = '5a';
    fixture.detectChanges();

    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let button = buttons.find(button => button.nativeElement.textContent.includes('Calcular Simpson'));
    if (button) {
      button.triggerEventHandler('click', null);
    } else {
      fail('Button with text "Calcular Simpson" not found');
    }

    expect(component.calcularSimpson).toHaveBeenCalled();
});

it('should calculate T when button is clicked', () => {
    spyOn(component, 'calcularT');

    component.activeCalculation = '5a';
    fixture.detectChanges();

    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let button = buttons.find(button => button.nativeElement.textContent.includes('Calcular T'));
    if (button) {
      button.triggerEventHandler('click', null);
    } else {
      fail('Button with text "Calcular T" not found');
    }

    expect(component.calcularT).toHaveBeenCalled();
});

it('should calculate stdDev when button is clicked', () => {
  spyOn(component, 'calcularDesviacion');

  component.activeCalculation = '1a';
  fixture.detectChanges();

  // Asegúrate de que la media ya esté calculada
  component.mediaResult = 5.5; // Un resultado de media previamente calculado

  let buttons = fixture.debugElement.queryAll(By.css('button'));
  let button = buttons.find(button => button.nativeElement.textContent.includes('Calcular Desviacion'));
  if (button) {
    button.triggerEventHandler('click', null);
  } else {
    fail('Button with text "Calcular Desviacion" not found');
  }

  expect(component.calcularDesviacion).toHaveBeenCalled();
});

it('should not calculate Simpson if data is incomplete', () => {
  component.fx = 'x^2';
  component.x0 = '';
  component.x1 = '10';
  component.numSegmentos = '10';
  component.margenError = '0.01';

  component.calcularSimpson();

  expect(component.resultadoSimpson).toBeNaN();
});


it('should not calculate T if dof is not specified', () => {
  component.dof = '';

  component.calcularT();

  expect(component.resultadoT).toBeNaN();
});


it('should calculate media correctly with specific array', () => {
  component.activeCalculation = '1a';
  fixture.detectChanges();

  component.inputArray = "1,2,3,4,5,6,7,8,9,10";
  component.calcularMediaFromArray();

  expect(component.mediaResult).toBeCloseTo(5.5);
});

it('should show alert if array length is not 10 for media calculation', () => {
  spyOn(window, 'alert');
  component.activeCalculation = '1a';
  fixture.detectChanges();

  component.inputArray = "1,2,3,4,5";
  component.calcularMediaFromArray();

  expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa exactamente 10 números separados por comas.');
});

it('should calculate stdDev correctly after calculating media', () => {
  component.activeCalculation = '1a';
  fixture.detectChanges();

  component.inputArray = "1,2,3,4,5,6,7,8,9,10";
  component.calcularMediaFromArray();
  component.calcularDesviacion();

  expect(component.stdDevResult).toBeCloseTo(2.8722813232690143);
});

it('should calculate media when button is clicked', () => {
  spyOn(component, 'calcularMediaFromArray');

  component.activeCalculation = '1a';
  fixture.detectChanges();

  let buttons = fixture.debugElement.queryAll(By.css('button'));
  let button = buttons.find(button => button.nativeElement.textContent.includes('Calcular media'));
  if (button) {
    button.triggerEventHandler('click', null);
  } else {
    fail('Button with text "Calcular Media" not found');
  }

  expect(component.calcularMediaFromArray).toHaveBeenCalled();
});

it('should calculate stdDev when button is clicked', () => {
  spyOn(component, 'calcularDesviacion');

  component.activeCalculation = '1a';
  fixture.detectChanges();

  // Asegúrate de que la media ya esté calculada
  component.mediaResult = 5.5; // Un resultado de media previamente calculado

  let buttons = fixture.debugElement.queryAll(By.css('button'));
  let button = buttons.find(button => button.nativeElement.textContent.includes('Calcular Desviacion'));
  if (button) {
    button.triggerEventHandler('click', null);
  } else {
    fail('Button with text "Calcular Desviacion" not found');
  }

  expect(component.calcularDesviacion).toHaveBeenCalled();
});

it('should validate input data for media calculation', () => {
  component.inputArray = '1,2,3,4,5,6,a,8,9,10'; // 'a' es inválido

  component.calcularMediaFromArray();

  expect(component.mediaResult).toBeNaN();
});

it('should validate number of elements in array for stdDev calculation', () => {
  component.inputArray = '1,2,3,4,5,6,7,8,9'; // faltan elementos

  component.calcularDesviacion();

  expect(component.stdDevResult).toBeNull();
});

it('should calculate regression when button is clicked', () => {
  spyOn(component, 'calcularRegresion');
  component.activeCalculation = '3a';
  fixture.detectChanges();

  component.inputArrayX = "1,2,3,4,5";
  component.inputArrayY = "3,4,2,5,6";
  component.valorPredecir = 2;

  let button = fixture.debugElement.query(By.css('button'));
  button.triggerEventHandler('click', null);

  expect(component.calcularRegresion).toHaveBeenCalled();
});

it('should calculate correlation when button is clicked', () => {
  spyOn(component, 'calcularCorrelacion');

  // Activa el cálculo '3a'
  component.activeCalculation = '3a';
  fixture.detectChanges(); // Actualiza el componente para reflejar el cambio

  // Busca el botón para calcular la correlación
  const button = fixture.debugElement.queryAll(By.css('button'))
                                      .find(de => de.nativeElement.textContent.includes('Calcular Correlación'));

  // Verifica que el botón existe y luego haz clic en él
  if (button) {
      button.nativeElement.click();
  } else {
      fail('Button to calculate correlation not found');
  }

  fixture.detectChanges(); // Actualiza el componente después del click

  expect(component.calcularCorrelacion).toHaveBeenCalled();
});

it('should not calculate regression if arrays are of different lengths', () => {
  component.activeCalculation = '3a';
  fixture.detectChanges();

  component.inputArrayX = "1,2,3,4,5";
  component.inputArrayY = "3,4,2,5";

  component.calcularRegresion();

  expect(component.resultadoRegresion).toBeNull();
});

it('should not calculate correlation if arrays are of different lengths', () => {
  component.activeCalculation = '3a';
  fixture.detectChanges();

  component.inputArrayX = "1,2,3,4,5";
  component.inputArrayY = "3,4,2,5";

  component.calcularCorrelacion();

  expect(component.resultadoCorrelacion).toBeNull();
});

it('should calculate correlation correctly with specific arrays', () => {
  component.activeCalculation = '3a';
  fixture.detectChanges();

  component.inputArrayX = "1,2,3,4,5";
  component.inputArrayY = "3,4,2,5,6";

  component.calcularCorrelacion();

  expect(component.resultadoCorrelacion).toBeDefined();
});

it('should set active calculation correctly', () => {
  component.setActiveCalculation('3a');
  expect(component.activeCalculation).toBe('3a');
});

it('should return 0 for calcularMedia when array is empty', () => {
  const result = component.calcularMedia([]);
  expect(result).toBe(0);
});

it('should return 0 for calcularDesviacionEstandar when array is empty', () => {
  const result = component.calcularDesviacionEstandar([], 5);
  expect(result).toBe(0);
});

it('should calculate regression correctly', () => {
  component.inputArrayX = '1,2,3,4,5';
  component.inputArrayY = '2,4,6,8,10';
  component.valorPredecir = 6;
  component.calcularRegresion();
  expect(component.resultadoRegresion).toEqual(jasmine.any(Object));
});

it('should calculate media correctly with a non-empty array', () => {
  const array = [1, 2, 3, 4, 5];
  const expectedMedia = 3; // (1+2+3+4+5)/5
  const result = component.calcularMedia(array);
  expect(result).toBe(expectedMedia);
});

it('should calculate standard deviation correctly with a non-empty array', () => {
  const array = [1, 2, 3, 4, 5];
  const media = 3; // Media calculada en la prueba anterior
  // Calcula la desviación estándar manualmente o usa un valor conocido
  const expectedStdDev = Math.sqrt(array.reduce((acc, num) => acc + Math.pow(num - media, 2), 0) / array.length);
  const result = component.calcularDesviacionEstandar(array, media);
  expect(result).toBeCloseTo(expectedStdDev);
});
});