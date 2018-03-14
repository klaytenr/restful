import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  createTask(newtask){
    return this._http.post('/tasks', newtask);
  }
  getTasks(){
    return this._http.get('/tasks');
  }
  edit(task){
    return this._http.put('/tasks/'+task._id, task);
  }
  getOne(id){
    return this._http.get('/tasks/'+id, id);
  }
  deleting(id){
    return this._http.delete('/tasks/'+id);
  }
}
