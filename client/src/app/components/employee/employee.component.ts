import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { EmployeeService } from '../../services/employee.service';
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {

  /* With employeeService: EmployeeService in the constructor,
  we are instantiating the class, to use all methods within it.
  In ts, we can use abbreviated constructor, so employeeService
  is an attribute of the class that has already been initialized */
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  resetForm(form: NgForm) {
      form.reset(); // Clean the form
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res
      },
      err => console.log(err)
    )
  }

  /* We imported NgForm that is a class that allow use the
  form as a variable in the method. Note that this form
  was selected in html component file with #employeeForm */
  addEmployee(form: NgForm) {
    if (form.value._id) { // If id exists, is because an employee gonna be updated
      this.employeeService.putEmployee(form.value).subscribe(
        res => this.getEmployees(),
        err => console.log(err)
      );
    }
    else { // An employee gonna be created
      this.employeeService.createEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees();
          this.resetForm(form);
        });
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Confirm your decision')) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => {
          this.getEmployees();
        },
        err => console.log(err)
      )
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    console.log(employee);
  }
}
