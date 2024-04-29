import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeModel } from '../../../models/employee';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AddEmployeeComponent {
  model = new EmployeeModel(0, "", "");
  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
  }
  ngOnInit(): void {

  }

  newEmployee() {
    const id = 0;
    const name = this.model.name;
    const email = this.model.email;
    const employee = new EmployeeModel(
      id,
      name,
      email
    );
    console.log("Saving new Employee: " + name + ", " + email);
    this.employeeService.save(employee);
    console.log("New employee saved");

    //option 1
    //employeeForm.reset()

    //option 2
    this.router.navigate(['/list-employees']);
  }
}
