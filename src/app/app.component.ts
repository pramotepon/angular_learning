import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postTitle: string = '';
  postDetail: string = '';
  imageURL: string = '';
  postURL: string = '';
  addBackground: boolean = false;

}
