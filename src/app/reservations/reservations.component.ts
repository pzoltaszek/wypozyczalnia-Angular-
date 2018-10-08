import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[];
  log = '';
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  gpsCheckboxValue: boolean;
  wifiCheckboxValue: boolean;
  addEnsuranceCheckboxValue: boolean;

  constructor(private reservationService: ReservationsService,
              calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }

  add(customerId: number, carId: number): void {
    if (!this.gpsCheckboxValue) { this.gpsCheckboxValue = false; }
    if (!this.wifiCheckboxValue) { this.wifiCheckboxValue = false; }
    if (!this.addEnsuranceCheckboxValue) { this.addEnsuranceCheckboxValue = false; }
    const gps = this.gpsCheckboxValue;
    const wifi = this.wifiCheckboxValue;
    const addEnsurance = this.addEnsuranceCheckboxValue;
    const reservationFrom = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day );
    const reservationTo = new Date(this.toDate.year, this.toDate.month, this.toDate.day );
    if (!customerId || !carId || !reservationFrom.getMonth() || !reservationTo.getMonth()) {
      this.log = '(You have to fulfill at least customer id, car id and date range fields)';
      this.message();
      return;
    }
    this.reservationService.addReservation({reservationFrom, reservationTo, customerId, carId, gps, wifi, addEnsurance} as Reservation)
      .subscribe(reservation => {
        this.reservations.push(reservation);
      });
    this.log = '';
    alert('Reservation added!');
  }
  delete(reservation: Reservation): void {
    this.reservations = this.reservations.filter(h => h !== reservation);
    this.reservationService.deleteReservation(reservation).subscribe();
  }
  message(): string {
    return this.log;
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
}
