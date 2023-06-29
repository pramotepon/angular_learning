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
  price: number = 99.99;
  today: Date = new Date();
  postObj: object = {
    id: 1,
    postTitle: "Post1"
  }
  postArray: Array<string> = [
    "post 1",
    "post 2",
    "post 3",
    "post 4",
    "post 5",
  ]
  constructor() {

  }
}
