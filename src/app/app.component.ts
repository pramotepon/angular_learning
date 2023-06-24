import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string = 'Message From Typescript Component File';
  // imgUrl: string = 'https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg';
  bool: boolean = true;
  // Event Binding
  buttonClick() {
    console.log('Button Click Event worked');
  }
  // Event filtering
  // onKeyup($event:any) {
  //   if($event.keyCode == 13){
  // console.log('Enter key pressed.');
  // }
  // }
  // Template Variable
  onKeyup(username: any) {
    console.log(username);
  }
}
