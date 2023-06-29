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
  ];
  userDetail = {
    name: "User 1",
    city: "New york",
    countryCode: "US",
  }
  dummyText: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
  constructor() {

  }
}
