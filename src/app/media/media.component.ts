import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-media',
  template: ''
})
export class MediaComponent implements OnInit {
  devHoursAverage = 0;
  proxySizeAverage = 0;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.mediaService.getDevHours().subscribe(data => {
      this.devHoursAverage = this.mediaService.calculateAverage(data);
    });

    this.mediaService.getProxySize().subscribe(data => {
      this.proxySizeAverage = this.mediaService.calculateAverage(data);
    });
  }
}

