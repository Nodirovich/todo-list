import { Component, ViewChild, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from './shared/models/task.model';
import { ListService } from './shared/services/list.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('deleteConfirm') deleteConfirm: TemplateRef<any>;

  $list: Observable<Task[]>;
  themeMode: boolean = false;
  search: string;

  private $subscription = new Subscription();

  constructor(
    private readonly listService: ListService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  changeThemeMode(): void {
    this.themeMode = !this.themeMode;
  }

  getList(): void {
    this.$list = this.listService.getList();
  }

  removeTask(task: Task): void {
    const dialogRef = this.dialog.open(this.deleteConfirm);

    const dialog = dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.$list = this.listService.removeTask(task);
      }
    });
    this.$subscription.add(dialog);
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(ModalFormComponent);
    dialogRef.componentInstance.form.patchValue(task);
    dialogRef.componentInstance.isEdit = true;
    dialogRef.disableClose = true;

    const dialog = dialogRef.afterClosed().subscribe((result: Task) => {
      if (result.title?.length && result.content?.length) {
        this.$list = this.listService.editTask(result);
      }
    });
    this.$subscription.add(dialog);
  }

  doneTask(task: Task): void {
    this.$list = this.listService.doneTask(task);
  }

  addTask(): void {
    const dialogRef = this.dialog.open(ModalFormComponent);
    dialogRef.disableClose = true;

    const dialog = dialogRef.afterClosed().subscribe((result: Task) => {
      if (result.title?.length && result.content?.length) {
        this.$list = this.listService.addTask(result);
      }
    });
    this.$subscription.add(dialog);
  }

  searchTask(text: string): void {
    this.search = text;
    this.$list = this.listService.filterList(text);
  }
}
