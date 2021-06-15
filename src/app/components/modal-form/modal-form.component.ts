import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  providers: [FormBuilder]
})
export class ModalFormComponent  {
  readonly form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    id: [Date.now()],
    done: [false]
  })

  isEdit: boolean = false;

  constructor(private readonly fb: FormBuilder) { }
}
