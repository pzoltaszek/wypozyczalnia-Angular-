// TESTY na podstawie przykladow ze strony:
// https://angular.io/guide/testing

import {TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Reservation Service tests', () => {

  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let reservationService: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationsService]
    });

    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    reservationService = TestBed.get(ReservationsService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getReservations', () => {
    let expectedReservations: Reservation[];

    beforeEach(() => {
      reservationService = TestBed.get(ReservationsService);
      expectedReservations = [
        {
          id: 1, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
          customerId: 11, carId: 13, gps: true, wifi: true, addEnsurance: true
        },
        {
          id: 2, reservationFrom: new Date(2018, 1, 11), reservationTo: new Date(2018, 2, 15),
          customerId: 14, carId: 15, gps: false, wifi: false, addEnsurance: true
        },
        {
          id: 3, reservationFrom: new Date(2018, 2, 1), reservationTo: new Date(2018, 4, 11),
          customerId: 15, carId: 18, gps: true, wifi: true, addEnsurance: false
        }
      ] as Reservation[];
    });

    it('should return all reservations (called once)', () => {
      reservationService.getReservations().subscribe(
        reservations => expect(reservations).toEqual(expectedReservations, 'should return expected reservations'),
        fail
      );

      const req = httpTestingController.expectOne(reservationService.getReservationUrl());
      expect(req.request.method).toEqual('GET');

      req.flush(expectedReservations);
    });

    it('should return all reservations (called multiple times)', () => {
      reservationService.getReservations().subscribe();
      reservationService.getReservations().subscribe();
      reservationService.getReservations().subscribe(
        reservations => expect(reservations).toEqual(expectedReservations, 'should return expected reservations'),
        fail
      );

      const requests = httpTestingController.match(reservationService.getReservationUrl());
      expect(requests.length).toEqual(3, 'calls to getReservations()');

      requests[0].flush([0]);
      requests[1].flush([{id: 2, customerId: 3}]);
      requests[2].flush(expectedReservations);

    });

    it('should be OK returning no reservations', () => {
      reservationService.getReservations().subscribe(
        reservations => expect(reservations.length).toEqual(0, 'should have empty reservations array'),
        fail
      );

      const req = httpTestingController.expectOne(reservationService.getReservationUrl());
      req.flush([]);
    });


  });

  describe('#update Reservation', () => {

    it('should update a reservation and return it', () => {

      const updateReservation: Reservation = {
        id: 1, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
        customerId: 11, carId: 13, gps: true, wifi: true, addEnsurance: true
      };

      reservationService.updateReservation(updateReservation).subscribe(
        data => expect(data).toEqual(updateReservation, 'should return the reservation'),
        fail
      );

      const req = httpTestingController.expectOne(reservationService.getReservationUrl());
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateReservation);
    });

  });

  describe('#add Reservation', () => {

    it('should add reservation to list and return it', () => {

      const addReservation: Reservation = {
        id: 1, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
        customerId: 11, carId: 13, gps: true, wifi: true, addEnsurance: true
      };

      reservationService.addReservation(addReservation).subscribe(
        data => expect(data).toEqual(addReservation, 'should return the added reservation'),
        fail
      );

      const req = httpTestingController.expectOne('api/reservations');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addReservation);
    });
  });

  describe('#get one reservation', () => {
    it('should return expected reservation (called once)', () => {
      const toAdd: Reservation = {
        id: 11, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
        customerId: 11, carId: 11, gps: true, wifi: true, addEnsurance: true
      };

      reservationService.addReservation(toAdd);

      reservationService.getReservation(11).subscribe(
        res => expect(res).toEqual(toAdd, 'should return reservation'),
        fail
      );

      const req = httpTestingController.expectOne(reservationService.reservationsUrl + '/11');
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('#delete reservation', () => {
    it('should return deleted reservation (called once)', () => {
      const toDelete: Reservation = {
        id: 11, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
        customerId: 11, carId: 11, gps: true, wifi: true, addEnsurance: true
      };

      reservationService.addReservation(toDelete);

      reservationService.deleteReservation(11).subscribe(
        res => expect(res).toEqual(toDelete, 'should return deleted reservation'),
        fail
      );

      const req = httpTestingController.expectOne(reservationService.reservationsUrl + '/11');
      expect(req.request.method).toEqual('DELETE');
    });
  });
});
