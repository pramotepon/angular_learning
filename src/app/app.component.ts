import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "Angular Course";
  count: number = 285645;
  dcValue: number = 3.85674;
  constructor(){

  }
}
