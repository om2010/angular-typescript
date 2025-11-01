import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-app';
  emplyoeeFrom:FormGroup = new FormGroup({});
  employeeObj:EmployeeModel = new EmployeeModel();
  isEditMode = false;
  employeeList:EmployeeModel[] = [];
  constructor(){
  this.createForm();
  if(typeof window !=='undefined' && localStorage){
  const oldData = localStorage.getItem('EmpData');
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }
  }
  createForm(){
    this.emplyoeeFrom = new FormGroup({
      empId:new FormControl(this.employeeObj.empId),
      name:new FormControl(this.employeeObj.name),
      city:new FormControl(this.employeeObj.city),
      address:new FormControl(this.employeeObj.address),
      state:new FormControl(this.employeeObj.state),
      contactNumber:new FormControl(this.employeeObj.contactNumber),
      pinCode:new FormControl(this.employeeObj.pinCode),
      emailId:new FormControl(this.employeeObj.emailId),
    })
  }
  saveData(){
   const oldData = localStorage.getItem('EmpData');
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.emplyoeeFrom.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.emplyoeeFrom.value);
    }
    else{
      this.employeeList.unshift(this.emplyoeeFrom.value);
    }
     localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
     this.employeeObj = new EmployeeModel();
     this.emplyoeeFrom.reset();
  }
  onEdit(item:EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }
  updateData(){
    const record = this.employeeList.find(m=>m.empId == this.emplyoeeFrom.controls['empId'].value);
    if(record != undefined){
      record.address = this.emplyoeeFrom.controls['address'].value;
      record.city = this.emplyoeeFrom.controls['city'].value;
      record.contactNumber = this.emplyoeeFrom.controls['contactNumber'].value;
      record.emailId = this.emplyoeeFrom.controls['emailId'].value;
      record.name = this.emplyoeeFrom.controls['name'].value;
      record.pinCode = this.emplyoeeFrom.controls['pinCode'].value;
      record.state = this.emplyoeeFrom.controls['state'].value;
    }
     localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
     this.employeeObj = new EmployeeModel();
     this.emplyoeeFrom.reset();
  }
  onDelete(id:number){
    const isDelete = confirm("Are you want to sure delete?")
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  }
}
