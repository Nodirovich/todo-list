import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";

const mockList = [
  {
    id: 0,
    title: 'item 1',
    content: 'Some content from list',
    done: true,
  },
  {
    id: 1,
    title: 'item 2',
    content: 'Some content from list 2',
    done: true,
  },
  {
    id: 2,
    title: 'item 3',
    content: 'Some content from list 3',
    done: false,
  }
];

const localList = 'todo-list';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private list: Task[];

  observeList(): Observable<Task[]> {
    localStorage.setItem(localList, JSON.stringify(this.list));
    return of(this.list);
  }

  getList(): Observable<Task[]> {
    const list: Task[] = JSON.parse(localStorage.getItem(localList)) || mockList;
    this.list = list;
    return this.observeList();
  }

  addTask(task: Task): Observable<Task[]> {
    this.list = [task, ...this.list];
    return this.observeList();
  }

  removeTask(task: Task): Observable<Task[]> {
    this.list = this.list.filter(({id}) => id !== task.id);
    return this.observeList();
  }

  editTask(task: Task): Observable<Task[]> {
    this.list = this.list.map((item) => {
      return item.id === task.id ? task : item;
    })
    console.log(this.list);
    return this.observeList();
  }

  doneTask(task: Task): Observable<Task[]> {
    this.list = this.list.map((item) => {
      item.id === task.id ? task.done = !task.done : null;
      return item
    })
    return this.observeList();
  }

  filterList(text: string): Observable<Task[]> {
    const value = this.transformText(text);
    const filterList = this.list.filter(({title, content}) => {
      title = this.transformText(title);
      content = this.transformText(content);
      return title.includes(value) || content.includes(value);
    });
    return of(filterList);
  }

  transformText(text: string): string {
    return text?.trim().toLowerCase();
  }
}