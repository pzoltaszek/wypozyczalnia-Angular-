import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders} from '@angular/common/http';


import { Car } from './car';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class CarService {
  private carsUrl = 'api/cars';
getCars(): Observable<Car[]> {
  return this.http.get<Car[]>(this.carsUrl);
}
getCar(id: number): Observable<Car> {
  const url = `${this.carsUrl}/${id}`;
  return this.http.get<Car>(url);
}
  constructor(private http: HttpClient) { }

  updateCar (car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, httpOptions);
  }
  addCar (car: Car): Observable<Car> {
  return this.http.post<Car>(this.carsUrl, car, httpOptions);
  }
  deleteCar (car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, httpOptions);
  }
  searchCars(term: string): Observable<Car[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Car[]>(`api/cars/?mark=${term}`);
  }
}
