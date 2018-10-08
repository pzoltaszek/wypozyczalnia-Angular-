import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  model: NgbDateStruct;
  log = '';
@Input() customer: Customer;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.log = '';
    const birthdayDate = new Date();
  if (this.model.year === undefined) {
      this.log = '(You have to set date)';
      this.message();
      return; }
    if (this.model.year > 0) {
      birthdayDate.setFullYear(this.model.year);
      birthdayDate.setMonth(this.model.month);
      birthdayDate.setDate(this.model.day);
      this.customer.birthdayDate = birthdayDate;
      this.customerService.updateCustomer(this.customer)
        .subscribe( () => this.goBack());
      return;
    }
  }
  message(): string {
    return this.log;
  }

}
