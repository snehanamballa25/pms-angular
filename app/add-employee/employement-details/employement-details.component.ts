import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { employement } from 'src/app/models/employement';
import { personal } from 'src/app/models/personal';
import { ApiService } from 'src/app/Services/Api.Service';
import { ManagingService } from 'src/app/Services/managing.Service';

@Component({
  selector: 'app-employement-details',
  templateUrl:'./employement-details.component.html',
  styleUrls: ['./employement-details.component.css']
})
export class EmployementDetailsComponent implements OnInit {
  personalformdata: personal;
  employeeForm : FormGroup;
  UserData: employement = {
    joiningdate: '',
         location:'',
      grade:'',
        salary:'',
        prevcompany:'',
        trianzexperience:'',
        manager:'',
        designation:'',
        department:'',
        managerid: '',
        activestatus:'',
        totalexperience:'',
        empid: '',
        otp:''

  }

  submitted = false;
  constructor(private manageService : ManagingService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    //to get the data added in personal form
    // this.manageService.personalinfoadded.subscribe(
    //   (personalinfo : personal)=>{
    //     this.personalformdata = personalinfo;
    //   }
    // );


    this.employeeForm = new FormGroup({
      joiningDate : new FormControl(null , Validators.required),
      location : new FormControl(null, Validators.required),
      grade : new FormControl(null, Validators.required),
      salary:new FormControl(null, Validators.required),
      prevExperience :new FormControl(null, Validators.required),
      prevCompany : new FormControl(null, Validators.required),
      manager: new FormControl(null, Validators.required),
      designation:new FormControl(null,Validators.required),
      dept: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.employeeForm.value);
    this.submitted = true;
    
    this.personalformdata= this.manageService.personalinfoadded;
    console.log(this.personalformdata);

    this.UserData.department = this.employeeForm.value.dept;
    this.UserData.designation = this.employeeForm.value.designation;
    this.UserData.grade = this.employeeForm.value.grade;
    this.UserData.joiningdate = this.employeeForm.value.joiningDate;
    this.UserData.location = this.employeeForm.value.location;
    this.UserData.prevcompany = this.employeeForm.value.prevCompany;
    this.UserData.totalexperience = this.employeeForm.value.prevExperience;
    this.UserData.manager = this.employeeForm.value.manager;
    this.UserData.salary = this.employeeForm.value.salary;
    console.log(this.UserData);
    this.apiService.addEmployee(this.personalformdata, this.UserData).subscribe(data=> console.log(data));
    

  }

}
