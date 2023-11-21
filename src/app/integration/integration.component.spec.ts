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
});