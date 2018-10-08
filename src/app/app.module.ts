import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2OrderModule } from 'ng2-order-pipe';


import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarService } from './car.service';
import { AppRoutingModule } from './/app-routing.module';
import { InMemoryDataService } from './in-memory-data.service';
import { CarSearchComponent } from './car-search/car-search.component';
import { CarReservationComponent } from './car-reservation/car-reservation.component';
import { CarDetailReservationComponent } from './car-detail-reservation/car-detail-reservation.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from './customer.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsService } from './reservations.service';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    CarSearchComponent,
    CarReservationComponent,
    CarDetailReservationComponent,
    CustomersComponent,
    CustomerDetailComponent,
    ReservationsComponent,
    ReservationDetailComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    AppRoutingModule,
    Ng2OrderModule,
    NgbModule.forRoot(),
  ],
  providers: [CarService, CustomerService, ReservationsService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
