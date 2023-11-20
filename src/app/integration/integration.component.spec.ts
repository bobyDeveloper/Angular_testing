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
});