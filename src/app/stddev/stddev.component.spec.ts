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
  });

  it('Should return stddev=62.26 with the 1a_dev_hours.json', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.devHoursStddev).toBeCloseTo(62.26, 2);
  });

  it('Should return stddev=572.03 with the 1a_proxy_size.json', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.proxySizeStddev).toBeCloseTo(572.03, 2);
  });
});

