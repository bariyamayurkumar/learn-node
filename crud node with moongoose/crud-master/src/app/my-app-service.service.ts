import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx'
@Injectable()
export class MyAppServiceService {
  data = {};
  constructor(private http: Http) { }
  insertData(user){
    this.data = user;
    return this.http.post('http://localhost:3001/insert',this.data);
  }

  display(){
    return this.http.get('http://localhost:3001/select').map((response)=>{
      return response.json();
    })
  }

  delete(id){
    //console.log('id:'+id)
    return this.http.post('http://localhost:3001/delete/',{id: id});
  }

  findId(id)
  {
    return this.http.post('http://localhost:3001/find/',{id: id}).map((response)=>{
      return response.json();
    });
  }

  update(user){
    return this.http.post('http://localhost:3001/update/',user);
  }
}
