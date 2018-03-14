import { Component, OnInit } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTask: any;
  title = 'Restful';
  tasks = [];
  taskEdit = [];
  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.newTask = { title: '', description: ''};
  }
  onSubmit() {
    let task = this._httpService.createTask(this.newTask);
    task.subscribe((data: any) => {
      console.log(data);
      this.newTask = { title: '', description: ''};
    })
  }
  onSubmitEdit(task){
    let tasky = this._httpService.edit(task);
    tasky.subscribe((data: any) => {
      console.log(data.task);
    })
  }
  getTasksFromService(){
    let Observable = this._httpService.getTasks();
    Observable.subscribe((data: any) => {
      console.log('Got our tasks!', data);
      this.tasks = data.data;
    });
  }
  getTask(id){
    let task = this._httpService.getOne(id);
    task.subscribe((data: any) => {
      console.log('one task edit', data.task);
      this.taskEdit = [];
      this.taskEdit.push(data.task);
    })
  }
  deleteTask(id){
    let taskies = this._httpService.deleting(id);
    taskies.subscribe((info: any) => {
      console.log('deleting');
      
    })
  }
}
