// TESTY na podstawie przykladow ze strony:
// https://angular.io/guide/testing

import {TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Car } from './car';
import { HttpClient } from '@angular/common/http';
import { CarService } from './car.service';


describe('CarService tests', () => {

  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });

    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    carService = TestBed.get(CarService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getCars', () => {
    let expectedCars: Car[];

    beforeEach(() => {
      carService = TestBed.get(CarService);
      expectedCars = [
        {id: 11, mark: 'Toyota', model: 'Avensis', description: 'comfortable', colour: 'white'
          , productionYear: 2015, retirementYear: 2035, mileage: 1000, serviceFrom: new Date(2018, 5, 4),
          serviceTo: new Date(2018, 5, 8)},
        {id: 12, mark: 'Ferrari', model: 'F50', description: 'very fast', colour: 'red'
          , productionYear: 2017, retirementYear: 2037, mileage: 3000, serviceFrom: new Date(2018, 6, 5),
          serviceTo: new Date(2018, 6, 9) },
        {id: 13, mark: 'Hundai', model: 'ix35', description: 'capacious', colour: 'brown'
          , productionYear: 2012, retirementYear: 2022, mileage: 10000, serviceFrom: new Date(2018, 4, 24),
          serviceTo: new Date(2018, 4, 28) }
      ] as Car[];
    });

    it('should return all cars (called once)', () => {
      carService.getCars().subscribe(
        cars => expect(cars).toEqual(expectedCars, 'should return all cars'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCars);
    });

    it('should return all cars (called multiple times)', () => {
      carService.getCars().subscribe();
      carService.getCars().subscribe();
      carService.getCars().subscribe(
        cars => expect(cars).toEqual(expectedCars, 'should return all cars'),
        fail
      );

      const requests = httpTestingController.match('api/cars');
      expect(requests.length).toEqual(3, 'calls to getCars() method');

      requests[0].flush([0]);
      requests[1].flush([{id: 11, mileage: 1000}]);
      requests[2].flush(expectedCars);

    });

    it('should be OK returning no cars', () => {
      carService.getCars().subscribe(
        cars => expect(cars.length).toEqual(0, 'should have empty cars array'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars');
      req.flush([]);
    });


  });

  describe('#updateCar', () => {

    it('should update a car and return it', () => {

      const toUpdate: Car = {id: 16, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
        , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
        serviceTo: new Date(2018, 11, 16) };

      carService.updateCar(toUpdate).subscribe(
        data => expect(data).toEqual(toUpdate, 'should return the car'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars');
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(toUpdate);
    });

  });

  describe('#addCar', () => {

    it('should add car to cars list and return it', () => {

      const addCar: Car = {id: 16, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
        , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
        serviceTo: new Date(2018, 11, 16) };

      carService.addCar(addCar).subscribe(
        data => expect(data).toEqual(addCar, 'should return the car'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addCar);
    });
  });

  describe('#get one car', () => {
    it('should return expected car (called once)', () => {
      const toAdd: Car = {id: 1, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
        , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
        serviceTo: new Date(2018, 11, 16) };

      carService.addCar(toAdd);

      carService.getCar(1).subscribe(
        car => expect(car).toEqual(toAdd, 'should return car'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars' + '/1');
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('#delete car', () => {
    it('should return deleted car (called once)', () => {
      const toDelete: Car = {id: 1, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
        , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
        serviceTo: new Date(2018, 11, 16) };

      carService.addCar(toDelete);

      carService.deleteCar(1).subscribe(
        res => expect(res).toEqual(toDelete, 'should return car'),
        fail
      );

      const req = httpTestingController.expectOne('api/cars' + '/1');
      expect(req.request.method).toEqual('DELETE');
    });
  });
});
