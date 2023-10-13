import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StddevComponent } from './stddev.component';
import { StddevService } from '../services/stddev.service';
import { HttpClientModule } from '@angular/common/http';

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
});