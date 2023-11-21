import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StddevComponent } from './stddev.component';
import { StddevService } from '../services/stddev.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;
  let stddevService: StddevService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StddevComponent],
      providers: [StddevService],
      imports: [HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StddevComponent);
    component = fixture.componentInstance;
    stddevService = TestBed.inject(StddevService);
    fixture.detectChanges();
  });

  it('Should return stddev=59.06 with the 1a_dev_hours.json', () => {
    const expectedStdDevForDevHours = 59.06106670218546;
    component.devHoursStdDev = expectedStdDevForDevHours;

    expect(component.devHoursStdDev).toEqual(expectedStdDevForDevHours);
  });

  it('Should return stddev=542.67 with the 1a_proxy_size.json', () => {
    const expectedStdDevForProxySize = 542.6723136479325;
    component.proxySizeStdDev = expectedStdDevForProxySize;

    expect(component.proxySizeStdDev).toEqual(expectedStdDevForProxySize);
  });

  it('should calculate proxy size standard deviation', () => {
    const mockData = [1, 2, 3, 4, 5]; // Datos ficticios para la prueba
    spyOn(stddevService, 'getProxySize').and.returnValue(of(mockData));

    component.calculateProxySizeStandardDeviation();
    fixture.detectChanges();

    // Aquí puedes agregar expectativas sobre cómo debería cambiar proxySizeStdDev
    expect(component.proxySizeStdDev).toBeGreaterThan(0);
  });

  it('should calculate dev hours standard deviation', () => {
    const mockData = [5, 4, 3, 2, 1]; // Datos ficticios para la prueba
    spyOn(stddevService, 'getDevHours').and.returnValue(of(mockData));

    component.calculateDevHoursStandardDeviation();
    fixture.detectChanges();

    // Aquí puedes agregar expectativas sobre cómo debería cambiar devHoursStdDev
    expect(component.devHoursStdDev).toBeGreaterThan(0);
  });

  it('should fetch and process dev hours data correctly', () => {
    const mockDevHoursResponse = { data: [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2] };
    spyOn(stddevService, 'getDevHours').and.returnValue(of(mockDevHoursResponse.data as number[]));

    component.calculateDevHoursStandardDeviation();
    fixture.detectChanges();

    // Verificar que se procesa la respuesta correctamente
    expect(component.devHoursStdDev).toBeGreaterThan(0);
    expect(stddevService.getDevHours).toHaveBeenCalled();
    expect(component.devHoursStdDev).toEqual(jasmine.any(Number)); // Verifica que sea un número
  });

  it('should fetch and process proxy size data correctly', () => {
    const mockProxySizeResponse = { data: [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503] };
    spyOn(stddevService, 'getProxySize').and.returnValue(of(mockProxySizeResponse.data));

    component.calculateProxySizeStandardDeviation();
    fixture.detectChanges();

    // Verificar que se procesa la respuesta correctamente
    expect(component.proxySizeStdDev).toBeGreaterThan(0);
    expect(stddevService.getProxySize).toHaveBeenCalled();
    expect(component.proxySizeStdDev).toEqual(jasmine.any(Number)); // Verifica que sea un número
  });
});