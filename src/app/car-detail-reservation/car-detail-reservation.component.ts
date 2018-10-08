import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../car';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';

import { CarService } from '../car.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ReservationsService } from '../reservations.service';
import {Reservation} from '../reservation';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-car-detail-reservation',
  templateUrl: './car-detail-reservation.component.html',
  styleUrls: ['./car-detail-reservation.component.css']
})
export class CarDetailReservationComponent implements OnInit {
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  reservations: Reservation[];
  notLogged = '';
  serviceDateLog = '';
  serviceDateLog2 = '';
  @Input() car: Car;

  constructor(private route: ActivatedRoute,
              private  carService: CarService,
              private location: Location,
              calendar: NgbCalendar,
              private appComponent: AppComponent,
              private reservationService: ReservationsService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.getCar();
    this.getReservations();
  }

  getCar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(id)
      .subscribe(car => this.car = car);
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }

  goBack(): void {
    this.location.back();
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  reserve(): void {
    this.getReservations();
    const customerId = this.appComponent.loggedCustomer;
    const carId = this.car.id;
    const reservationFrom = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    const reservationTo = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
    const gps = false;
    const wifi = false;
    const addEnsurance = false;
    if (!this.loggedCustomerValidator(customerId)) {
      this.notLogged = 'please loggin first!';
      this.message();
      return;
    }
    if (!this.serviceDateValidator(reservationFrom, reservationTo)) {
      this.serviceDateMessage();
      return;
    }
    const rent = this.getRentalForCar();
    if (!this.rentValidator(reservationFrom, reservationTo, rent )) {
      this.serviceDateMessage2();
      return;
    }
    this.reservationService.addReservation({reservationFrom, reservationTo, customerId, carId, gps, wifi, addEnsurance} as Reservation)
      .subscribe();
    this.notLogged = '';
    alert('Congratulations! You have reserved the car!');
  }

  loggedCustomerValidator(customerId: number): boolean {
    if (customerId === 0) {
      return false;
    }
    this.notLogged = '';
    return true;
  }

  message() {
    return this.notLogged;
  }

  serviceDateMessage() {
    return this.serviceDateLog;
  }

  serviceDateMessage2() {
    return this.serviceDateLog2;
  }

  serviceDateValidator(reservationFrom: Date, reservationTo: Date): boolean {
    const carServiceFrom = new Date(this.car.serviceFrom);
    const carServiceTo = new Date(this.car.serviceTo);
    if (carServiceFrom > reservationTo || carServiceTo < reservationFrom) {
      this.serviceDateLog = '';
      return true;
    }
    this.serviceDateLog = 'please choose another date. In this range car is in service';
    return false;
  }

  getRentalForCar(): Reservation {
    let i;
    let res: Reservation;
    for (i = 0; i <= this.reservations.length; i++) {
      if (this.reservations[i].carId === this.car.id) {
        res = this.reservations[i];
        return res;
      }
    }
    return res;
  }

  rentValidator(reservationFrom: Date, reservationTo: Date, res: Reservation): boolean {
    this.serviceDateLog2 = '';
    if (res != null) {
      const rentFrom = new Date(res.reservationFrom);
      const rentTo = new Date(res.reservationTo);
      if (rentFrom > reservationTo || rentTo < reservationFrom) {
        return true;
      }
      this.serviceDateLog2 = 'please choose another date. In this range car is rented';
      return false;
    }
    return false;
  }
}
