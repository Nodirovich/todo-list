import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  value: string = '';

  constructor() { }
  ngOnInit(): void {
  }

  searchTask(event): void {
    const value = event.target.value
    this.search.emit(value);
  }

}
