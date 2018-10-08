import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = [
      {id: 11, mark: 'Toyota', model: 'Avensis', description: 'comfortable', colour: 'white'
        , productionYear: 2015, retirementYear: 2035, mileage: 1000, serviceFrom: new Date(2018, 5, 4),
      serviceTo: new Date(2018, 5, 8)},
      {id: 12, mark: 'Ferrari', model: 'F50', description: 'very fast', colour: 'red'
        , productionYear: 2017, retirementYear: 2037, mileage: 3000, serviceFrom: new Date(2018, 6, 5),
        serviceTo: new Date(2018, 6, 9) },
      {id: 13, mark: 'Hundai', model: 'ix35', description: 'capacious', colour: 'brown'
        , productionYear: 2012, retirementYear: 2022, mileage: 10000, serviceFrom: new Date(2018, 4, 24),
        serviceTo: new Date(2018, 4, 28) },
      {id: 14, mark: 'Ford', model: 'Mustang', description: 'very strong', colour: 'yellow'
        , productionYear: 2010, retirementYear: 2025, mileage: 20000, serviceFrom: new Date(2018, 7, 11),
        serviceTo: new Date(2018, 7, 18) },
      {id: 15, mark: 'Volkswagen', model: 'Passat', description: 'general use', colour: 'silver'
        , productionYear: 2012, retirementYear: 2082, mileage: 15000, serviceFrom: new Date(2018, 9, 10),
        serviceTo: new Date(2018, 9, 20) },
      {id: 16, mark: 'Fiat', model: '126p', description: 'our best!', colour: 'red'
        , productionYear: 1970, retirementYear: 2190, mileage: 150000, serviceFrom: new Date(2018, 11, 12),
        serviceTo: new Date(2018, 11, 16) },
      {id: 17, mark: 'Honda', model: 'Accord', description: 'for your bussiness trip', colour: 'white'
        , productionYear: 2014, retirementYear: 2034, mileage: 76000, serviceFrom: new Date(2019, 1, 14),
        serviceTo: new Date(2019, 2, 19) },
      {id: 18, mark: 'Skoda', model: 'Citygo', description: 'take it if you have problems with parking', colour: 'green'
        , productionYear: 2018, retirementYear: 2038, mileage: 5000, serviceFrom: new Date(2020, 2, 7),
        serviceTo: new Date(2020, 4, 9) },
    ];
    const customers = [
      {id: 11, name: 'Andrzej', surname: 'Nowak', email: 'a.nowak@pl.pl', birthdayDate: new Date(2011, 1, 4),
      login: 'login11', password: 'password11' },
      {id: 12, name: 'Filip', surname: 'Kowalski', email: 'filip.kowalski@pl.pl', birthdayDate: new Date(2012, 2, 5),
        login: 'login12', password: 'password12'},
      {id: 13, name: 'Piotr', surname: 'Jaki', email: 'p.jaki@o2.pl', birthdayDate: new Date(2013, 3, 6),
        login: 'login13', password: 'password13'},
      {id: 14, name: 'Tekla', surname: 'Budyn', email: 't.tekla@email.pl', birthdayDate: new Date(2014, 4, 7),
        login: 'login14', password: 'password14'},
      {id: 15, name: 'Jane', surname: 'Smith', email: 'j.s99@email.pl', birthdayDate: new Date(2015, 5, 8),
        login: 'login15', password: 'password15'},
      {id: 16, name: 'Jan', surname: 'Janowski', email: 'j.j99@email.com', birthdayDate: new Date(2011, 11, 11),
        login: 'login16', password: 'password16'},
      {id: 17, name: 'Maciej', surname: 'Maciejewski', email: 'maciek666@email.pl', birthdayDate: new Date(1997, 10, 18),
        login: 'login17', password: 'password17'},
      {id: 18, name: 'Ewa', surname: 'Pierwsza', email: 'ewa.pierwsza@email.org', birthdayDate: new Date(1999, 10, 28),
        login: 'login18', password: 'password18'},
    ];
    const reservations = [
      {id: 1, reservationFrom: new Date(2018, 3, 1), reservationTo: new Date(2018, 3, 21),
        customerId: 11, carId: 13, gps: true, wifi: true, addEnsurance: true },
      {id: 2, reservationFrom: new Date(2018, 1, 11), reservationTo: new Date(2018, 2, 15),
        customerId: 14, carId: 15, gps: false, wifi: false, addEnsurance: true },
      {id: 3, reservationFrom: new Date(2018, 2, 1), reservationTo: new Date(2018, 4, 11),
        customerId: 15, carId: 18, gps: true, wifi: true, addEnsurance: false },
      {id: 4, reservationFrom: new Date(2017, 12, 21), reservationTo: new Date(2018, 2, 9),
        customerId: 16, carId: 16, gps: false, wifi: false, addEnsurance: false },
      {id: 5, reservationFrom: new Date(2018, 1, 11), reservationTo: new Date(2018, 3, 7),
        customerId: 18, carId: 18, gps: true, wifi: true, addEnsurance: true },
      {id: 6, reservationFrom: new Date(2018, 3, 21), reservationTo: new Date(2018, 4, 21),
        customerId: 12, carId: 11, gps: false, wifi: false, addEnsurance: true },
      {id: 7, reservationFrom: new Date(2018, 4, 1), reservationTo: new Date(2018, 5, 14),
        customerId: 13, carId: 12, gps: false, wifi: true, addEnsurance: false },
      {id: 8, reservationFrom: new Date(2018, 5, 1), reservationTo: new Date(2018, 6, 1),
        customerId: 17, carId: 17, gps: false, wifi: false, addEnsurance: false },
    ];
    return {cars, customers, reservations};
  }
}
