import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  log = '';
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  constructor(private carService: CarService,
              calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }
  add(mark: string, model: string, description: string, colour: string, productionYear: number, retirementYear: number,
      mileage: number ): void {
    mark = mark.trim();
    model = model.trim();
    description = description.trim();
    colour = colour.trim();
    const serviceFrom = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day );
    const serviceTo = new Date(this.toDate.year, this.toDate.month, this.toDate.day );
    if (!mark || !model || !description || !colour || !productionYear || !retirementYear || !mileage
      || !serviceFrom.getMonth() || !serviceTo.getMonth()) {
      this.log = '(You have to fulfill all fields)';
      this.message();
    return; }
    this.carService.addCar({mark, model, description, colour, productionYear, retirementYear, mileage, serviceFrom, serviceTo } as Car)
      .subscribe(car => {
        this.cars.push(car);
      });
    this.log = '';
    alert('Car added!');
  }
  delete(car: Car): void {
    this.cars = this.cars.filter(h => h !== car);
    this.carService.deleteCar(car).subscribe();
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
