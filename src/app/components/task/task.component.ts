import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  {
  @Input() task: Task;

  @Output() remove = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() done = new EventEmitter<Task>();

  constructor() { }

  setTask(event: string): void {
    this[event].emit(this.task);
  }
}
