import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaComponent } from './media.component';
import { MediaService } from '../services/media.service';
import { HttpClientModule } from '@angular/common/http';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let mediaService: MediaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaComponent],
      providers: [MediaService],
      imports: [HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    mediaService = TestBed.inject(MediaService);
  });

  it('Should return mean=60.32 with the json 1a_dev_hours', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.devHoursAverage).toBeCloseTo(60.32, 2);
  });

  it('Should return mean=550.6 with the json 1a_proxy_size', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.proxySizeAverage).toBeCloseTo(550.6, 1);
  });
});
