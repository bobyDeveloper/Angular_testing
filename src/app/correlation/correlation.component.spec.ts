import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrelationComponent } from './correlation.component';
import { LinearRegressionService } from '../services/linear-regression.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('CorrelationComponent', () => {
  let component: CorrelationComponent;
  let fixture: ComponentFixture<CorrelationComponent>;
  let service: LinearRegressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrelationComponent],
      providers: [LinearRegressionService],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CorrelationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LinearRegressionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testData1 = {
    proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
    actual_add: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601],
  };

  const testData2 = {
    proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
    actual_develop: [
      15, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ],
  };

  const testData3 = {
    plan_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
    actual_added: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601],
  };

  const testData4 = {
    plan_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
    actual_develop: [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ],
  };

  it('Should return r=0.9545 with the dataset Data_Test1', () => {
    spyOn(service, 'getData1').and.returnValue(of(testData1));
    component.getData(1);
    component.calculos();
    expect(component.calcularR()).toBeCloseTo(0.9545, 4);
  });

  it('Should return rr=0.9111 with the dataset Data_Test1', () => {
    spyOn(service, 'getData1').and.returnValue(of(testData1));
    component.getData(1);
    component.calculos();
    expect(component.calcularRCuadrada()).toBeCloseTo(0.9111, 4);
  });

  it('Should return r=0.9333 with the dataset Data_Test2', () => {
    spyOn(service, 'getData2').and.returnValue(of(testData2));
    component.getData(2);
    component.calculos();
    expect(component.calcularR()).toBeCloseTo(0.9333, 4);
  });

  it('Should return rr=0.8711 with the dataset Data_Test2', () => {
    spyOn(service, 'getData2').and.returnValue(of(testData2));
    component.getData(2);
    component.calculos();
    expect(component.calcularRCuadrada()).toBeCloseTo(0.8711, 4);
  });

  it('Should return r=0.9631 with the dataset Data_Test3', () => {
    spyOn(service, 'getData3').and.returnValue(of(testData3));
    component.getData(3);
    component.calculos();
    expect(component.calcularR()).toBeCloseTo(0.9631, 4);
  });

  it('Should return rr=0.9276 with the dataset Data_Test3', () => {
    spyOn(service, 'getData3').and.returnValue(of(testData3));
    component.getData(3);
    component.calculos();
    expect(component.calcularRCuadrada()).toBeCloseTo(0.9276, 4);
  });

  it('Should return r=0.9480 with the dataset Data_Test4', () => {
    spyOn(service, 'getData4').and.returnValue(of(testData4));
    component.getData(4);
    component.calculos();
    expect(component.calcularR()).toBeCloseTo(0.948, 4);
  });

  it('Should return rr=0.8988 with the dataset Data_Test4', () => {
    spyOn(service, 'getData4').and.returnValue(of(testData4));
    component.getData(4);
    component.calculos();
    expect(component.calcularRCuadrada()).toBeCloseTo(0.8988, 4);
  });
});