import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MyAppServiceService} from "../my-app-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f') form: NgForm
  state = '';
  city = '';
  fname = '';
  lname = '';
  password = '';
  email = '';
  id = '';

  user = {
    fname : '',
    lname : '',
    email : '',
    password : '',
    state : '',
    city : '',
    id : ''
  }

  data = []


  constructor(private myService: MyAppServiceService) { }


  editMode: boolean = false;
  ngOnInit() {
   this.select();
  }
  onSubmit() {
    this.user.fname = this.form.value.fname;
    this.user.lname = this.form.value.lname;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.state = this.form.value.state;
    this.user.city = this.form.value.city;

    this.myService.insertData(this.user).subscribe(
      (response)=>{
          console.log(response);
           this.select();
      },(error)=>{
        console.log(error)
      }
    );

    this.form.resetForm()
  }

  onDelete(id){
    this.myService.delete(id).subscribe((response)=>{
      this.select();
    });

  }

  select()
  {
    console.log('call select')
    this.myService.display().subscribe((data)=>{
      this.data = data;
      console.log(data);
    },(error)=>{
      console.log(error)
    });
  }


  onEdit(id)
  {
    this.editMode = true;
    this.myService.findId(id).subscribe((data)=>{
      console.log(data);
      this.fname = data.fname;
      this.lname = data.lname;
      this.email = data.email;
      this.state = data.state;
      this.city = data.city;
      this.password = data.password;
      this.id = id;
    });
    // this.fname = this.editData.fname;
  }

  updateData(){
    this.user.fname = this.form.value.fname;
    this.user.lname = this.form.value.lname;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.state = this.form.value.state;
    this.user.city = this.form.value.city;
    this.user.id = this.id;
    this.myService.update(this.user).subscribe((response)=>
    {
      this.select();
    });
    this.form.resetForm();
    // location.reload()
  }
  key='fname';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
