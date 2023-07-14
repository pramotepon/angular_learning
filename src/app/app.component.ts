import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { noSpace } from './validators/nospace.validators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: any;
  constructor(fb: FormBuilder) {

    this.form = fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        noSpace.noSpaceValidations
      ]],
      password: ['', Validators.required]
    })
  }

  get fc(){
    return this.form.controls
    // this.fc.username
    // this.fc.password
  }
}
