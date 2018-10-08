import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';


@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.css']
})
export class CarReservationComponent implements OnInit {
  key = 'name';
  reverse = false;
  cars: Car[];
  constructor(private carService: CarService) {
    setInterval(() => {
      this.searchFunction();
    }, 300);
  }

  ngOnInit() {
    this.getCars();
  }
  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  searchFunction() {
    let input, filter, table, tr, td, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('carsTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search input
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

}
