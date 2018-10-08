import { Component, OnInit } from '@angular/core';
import {Customer} from '../customer';
import {  CustomerService} from '../customer.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
customers: Customer[];
  log = '';
  model: NgbDateStruct;
  constructor(private customerService: CustomerService,
              calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
  }
  add(name: string, surname: string, email: string ): void {
    name = name.trim();
    surname = surname.trim();
    email = email.trim();
    const login = name;
    const password = surname;
    const birthdayDate = new Date(this.model.year, this.model.month, this.model.day );
    if (!name || !surname || !email || !birthdayDate.getMonth() || !this.model.month) {
      this.log = '(You have to fulfill all fields)';
      this.message();
      return;
    }
    // if (!this.addValidator(name, email)) {
    //   this.log = 'such user exists';
    //   this.message();
    //   return;
    // }
    this.customerService.addCustomer({name, surname, email, birthdayDate, login, password} as Customer)
      .subscribe(customer => {this.customers.push(customer);
      });
    this.log = '';
    alert('Customer added!');
    return;
  }
  message(): string {
    return this.log;
  }
  addValidator(name: string, email: string ): boolean {
    let r;
    for (r = 0; r <= this.customers.length; r++) {
      if (this.customers[r].name === name || this.customers[r].email === email) {
        return false;
      }
    }
    return true;
  }
}
