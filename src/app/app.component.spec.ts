// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { RouterModule, Routes, RouterOutlet } from '@angular/router';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import {RouterTestingModule} from '@angular/router/testing';
// import { CustomerService } from './customer.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
// import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import { ReservationsService} from './reservations.service';
// import { CarService} from './car.service';
// import { CarDetailComponent } from './car-detail/car-detail.component';
// import { CarDetailReservationComponent } from './car-detail-reservation/car-detail-reservation.component';
// import { CarReservationComponent } from './car-reservation/car-reservation.component';
// import { CarSearchComponent } from './car-search/car-search.component';
// import { CarouselComponent } from './carousel/carousel.component';
// import { CarsComponent } from './cars/cars.component';
// import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
// import { CustomersComponent } from './customers/customers.component';
// import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
// import { Reservation } from './reservation';
//
//
// beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [RouterTestingModule],
//       providers: [CustomerService, RouterOutlet, HttpClient, HttpHandler, NgbModal, NgbModalStack, HttpTestingController,
//          CarService, CarDetailComponent, ReservationsService,
//          CarDetailReservationComponent, CarReservationComponent, CarSearchComponent, CarouselComponent,
//           CarsComponent, CustomerDetailComponent, CustomersComponent, ReservationDetailComponent, Reservation, ]
//     }).compileComponents();
//  }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('Zoltaszek rentals');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to Zoltaszek rentals!');
//   }));
