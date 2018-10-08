import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Reservation} from './reservation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ReservationsService {
  public reservationsUrl = 'api/reservations';

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationsUrl);
  }

  getReservation(id: number): Observable<Reservation> {
    const url = `${this.reservationsUrl}/${id}`;
    return this.http.get<Reservation>(url);
  }
  getReservationUrl() {
    return this.reservationsUrl;
  }

  constructor(private http: HttpClient) {
  }
  updateReservation (reservation: Reservation): Observable<any> {
    return this.http.put(this.reservationsUrl, reservation, httpOptions);
  }
  addReservation (reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationsUrl, reservation, httpOptions);
  }
  deleteReservation (reservation: Reservation | number): Observable<Reservation> {
    const id = typeof reservation === 'number' ? reservation : reservation.id;
    const url = `${this.reservationsUrl}/${id}`;
    return this.http.delete<Reservation>(url, httpOptions);
  }
}


