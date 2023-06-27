import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ngSwitch
  objArray: Array<string> = []
  stepForm: string = "";

  onClick(status: string){
    this.stepForm = status;
  }
}
