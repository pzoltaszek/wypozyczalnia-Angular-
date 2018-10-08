// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {FormsModule} from '@angular/forms';
// import { CarsComponent} from './cars.component';
// import { CarService} from '../car.service';
// import { defer } from 'rxjs/observable/defer';
// import { NgbDateStruct, NgbCalendar, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AppRoutingModule } from '../app-routing.module';
// import { CustomersComponent } from '../customers/customers.component';
//
//
// describe('Cars Component', () => {
//   let component: CarsComponent;
//   let fixture: ComponentFixture<CarsComponent>;
//   const carServiceSpy = jasmine.createSpyObj('CarService', ['getCars']);
//   const ngbCalendar = jasmine.createSpyObj('NgbCalendar', ['getToday', 'getNext']);
//   const cars = [
//     {id: 11, mark: 'Toyota', model: 'Avensis', description: 'comfortable', colour: 'white'
//       , productionYear: 2015, retirementYear: 2035, mileage: 1000, serviceFrom: new Date(2018, 5, 4),
//       serviceTo: new Date(2018, 5, 8)},
//     {id: 12, mark: 'Ferrari', model: 'F50', description: 'very fast', colour: 'red'
//       , productionYear: 2017, retirementYear: 2037, mileage: 3000, serviceFrom: new Date(2018, 6, 5),
//       serviceTo: new Date(2018, 6, 9) },
//     {id: 13, mark: 'Hundai', model: 'ix35', description: 'capacious', colour: 'brown'
//       , productionYear: 2012, retirementYear: 2022, mileage: 10000, serviceFrom: new Date(2018, 4, 24),
//       serviceTo: new Date(2018, 4, 28) }
//   ];
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [NgbModule.forRoot(), AppRoutingModule],
//       declarations: [ CarsComponent ],
//       providers: [
//         {provide: CarService, useValue: carServiceSpy},
//         {provide: NgbCalendar, useValue: ngbCalendar}
//       ]
//     })
//       .compileComponents();
//     carServiceSpy.getRentals.and.returnValue(asyncData(cars));
//
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CarsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//
//
//
//
//
// // metoda async
//   function asyncData<T>(data: T) {
//     return defer(() => Promise.resolve(data));
//   }
// });
