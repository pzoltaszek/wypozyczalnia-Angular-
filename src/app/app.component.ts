import { Component} from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customers: Customer[];
  loggedCustomer = 0;
  userLogin: string;
  loginFulfillMessage: string;
  title = 'Zoltaszek rentals';
  log = '';
  closeResult: string;
  successRegister: string;
  validationLog: string;
  constructor( private customerService: CustomerService,
               private modalService: NgbModal) {}
  validate(customerLogin: string, customerPassword: string): void {
    this.getCustomers();
    if (!customerLogin || !customerPassword || customerLogin === '' || customerPassword === '') {
      this.loginFulfillMessage = 'wrong input';
      this.message();
      return;
    }
    if (customerLogin === 'admin' && customerPassword === 'admin') {
      const navigationHidding = document.getElementById('navigationHidding');
      navigationHidding.setAttribute('style', 'visibility: visible');
      const loginFormHidding = document.getElementById('loginFormHidding');
      loginFormHidding.setAttribute('style', 'visibility: hidden');
      const logoutButtonHidding = document.getElementById('logoutButtonHidding');
      logoutButtonHidding.setAttribute('style', 'visibility: visible');
      const registrationButton = document.getElementById('registrationButton');
      registrationButton.setAttribute('style', 'visibility: hidden');
      this.loginFulfillMessage = '';
      this.message();
      this.userLogin = 'hello '.concat(customerLogin);
      this.actualLogin();
      return;
    }
    if (this.validateUser(customerLogin, customerPassword)) {
      const loginFormHidding = document.getElementById('loginFormHidding');
      loginFormHidding.setAttribute('style', 'visibility: hidden');
      const logoutButtonHidding = document.getElementById('logoutButtonHidding');
      logoutButtonHidding.setAttribute('style', 'visibility: visible');
      const registrationButton = document.getElementById('registrationButton');
      registrationButton.setAttribute('style', 'visibility: hidden');
      this.userLogin = 'hello '.concat(customerLogin);
      this.loginFulfillMessage = '';
      return;
    }
    this.loginFulfillMessage = 'wrong input';
    return;
  }
  message(): string {
    return this.loginFulfillMessage;
  }
  actualLogin(): string {
    return this.userLogin;
  }
  logout(): void {
    const navigationHidding = document.getElementById('navigationHidding');
    // navigationHidding.setAttribute('style', 'visibility: hidden');
    navigationHidding.style.display = 'none';
    const loginFormHidding = document.getElementById('loginFormHidding');
    loginFormHidding.setAttribute('style', 'visibility: visible');
    const logoutButtonHidding = document.getElementById('logoutButtonHidding');
    logoutButtonHidding.setAttribute('style', 'visibility: hidden');
    const registrationButton = document.getElementById('registrationButton');
    registrationButton.setAttribute('style', 'visibility: visible');
    this.userLogin = '';
    this.loggedCustomer = 0;
    this.actualLogin();
  }
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  validateUser(customerLogin: string, customerPassword: string): boolean {
    this.getCustomers();
    let i;
    for (i = 0; i <= this.customers.length; i++) {
      if (this.customers[i].login === customerLogin && this.customers[i].password === customerPassword) {
        this.loggedCustomer = this.customers[i].id;
        return true;
      }
    }
    return false;
  }
  open(content) {
    this.successRegister = '';
    this.validationLog = '';
    this.loginFulfillMessage = '';
    this.log = '';
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }


  registration(customerLogin: string, customerPassword: string, email: string ): void {
    this.getCustomers();
    this.successRegister = '';
    this.validationLog = '';
    this.log = '';
    const login = customerLogin.trim();
    const password = customerPassword.trim();
    email = email.trim();
    if (!customerLogin || !customerPassword || !email) {
       this.log = '(You have to fulfill all fields)';
       this.registerMessage();
       return;
    }
    if (this.validateRegistration(login, email)) {
        this.validationLog = '(This data is already in use)';
        this.validationMessage();
        return;
    }
    const name = login;
    const surname = password;
    this.customerService.addCustomer({name, surname, email, login, password } as Customer)
    .subscribe(customer => {this.customers.push(customer);
    });
    this.successRegister = 'Registration completed';
    this.succesRegisterMessage();
    return;
  }
  registerMessage(): string {
    return this.log;
  }
  succesRegisterMessage(): string {
    return this.successRegister;
  }
  validateRegistration(customerLogin: string, email: string): boolean {
    let i;
    for (i = 0; i <= this.customers.length; i++) {
      if (this.customers[i].login === customerLogin && this.customers[i].email === email) {
        return true;
      }
    }
    return false;
  }
  validationMessage(): string {
    return this.validationLog;
  }
}


