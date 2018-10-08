import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public slides: string [] = ['assets/Toyota.jpg', 'assets/Ferrari.jpg', 'assets/Hundai.jpg', 'assets/Ford.jpg' ];
  public carNames: string [] = ['Toyota Avensis', 'Ferrari F50', 'Hundai ix35', 'Ford Mustang'];
  carName: string;
  i: number;
  carId: number;
  constructor() {
     setInterval(() => {
       this.counter();
     }, 500); // Updates the time every 0.5 second.
  }
  ngOnInit() {
    this.i = 1;
    this.carId = this.i + 11;
    this.carName = this.carNames[this.i];
  }

  getSlide(): string {
    return this.slides[this.i];
  }

  getPrev() {
    this.i--;
    this.carId = this.i + 11;
    this.carName = this.carNames[this.i];
    if (this.i < 0) {
      this.i = 3;
      this.carId = this.i + 11;
      this.carName = this.carNames[this.i];
      this.getSlide();
    }
  }

  getNext() {
    this.i++;
    this.carId = this.i + 11;
    this.carName = this.carNames[this.i];
    if (this.i > 3) {
      this.i = 0;
      this.carId = this.i + 11;
      this.carName = this.carNames[this.i];
      this.getSlide();
    }
  }
  counter() {
  const countDownDate = new Date('Apr 25, 2018 10:00:00').getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('counter').innerHTML = days + 'd ' + hours + 'h '
      + minutes + 'm ' + seconds + 's ';
  }
}
