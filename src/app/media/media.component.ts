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
      this.devHoursAverage = this.calcularMedia(data);
    });

    this.mediaService.getProxySize().subscribe(data => {
      this.proxySizeAverage = this.calcularMedia(data);
    });
  }

  calcularMedia(data: number[]): number {
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  }
}

export function calcularMedia(data: number[]): number {
    return data.reduce((acc, val) => acc + val, 0) / data.length;
}


