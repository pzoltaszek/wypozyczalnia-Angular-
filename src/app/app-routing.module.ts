import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarReservationComponent } from './car-reservation/car-reservation.component';
import { CarDetailReservationComponent } from './car-detail-reservation/car-detail-reservation.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationDetailComponent} from './reservation-detail/reservation-detail.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  { path: 'cars', component: CarsComponent},
  { path: 'customers', component: CustomersComponent },
  { path: 'dashboard', component: CarouselComponent },
  { path: 'detail/:id', component: CarDetailComponent},
  { path: 'customer-detail/:id', component: CustomerDetailComponent},
  { path: 'carReservation-detail/:id', component: CarDetailReservationComponent},
  { path: 'carReservation', component: CarReservationComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: 'reservations-detail/:id', component: ReservationDetailComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }

