import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { CarDetailComponent} from './car-detail.component';
import { CarService} from '../car.service';
import { defer } from 'rxjs/observable/defer';
import { NgbDateStruct, NgbCalendar, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Car} from '../car';
import { CarsComponent } from '../cars/cars.component';
import { CustomersComponent } from '../customers/customers.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CarDetailReservationComponent } from '../car-detail-reservation/car-detail-reservation.component';
import { CarReservationComponent } from '../car-reservation/car-reservation.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { ReservationDetailComponent } from '../reservation-detail/reservation-detail.component';

describe('Cars Detail Component', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  const carServiceSpy = jasmine.createSpyObj('CarService', ['getCar, updateCar']);
  const locationSpy = jasmine.createSpyObj('Location', ['back']);
  const routerSpy = jasmine.createSpyObj('ActivatedRoute', ['navigate', 'get']);

  const testCar: Car = {id: 16, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
    , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
    serviceTo: new Date(2018, 11, 16) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(), AppRoutingModule, FormsModule ],
      declarations: [ CarDetailComponent, CarsComponent, CustomersComponent, CarouselComponent, CustomerDetailComponent
      , CarDetailReservationComponent, CarReservationComponent, ReservationsComponent, ReservationDetailComponent ],
      providers: [
        {provide: CarService, useValue: carServiceSpy},
        {provide: Location, useValue: locationSpy},
        {provide: ActivatedRoute, useValue: routerSpy}
      ]
    })
      .compileComponents();
    carServiceSpy.getCar().and.returnValue(asyncData(testCar));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });






// metoda async
  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
