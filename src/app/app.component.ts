import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'learn-basic-angular';
  parentMessage: string = "Message coming from parent component";
  message:string = '';
  fromChildOutput:string = '';

  @ViewChild(PostComponent) childComp!: PostComponent;

  constructor() {
    // console.log(this.childComp);
  }

  ngAfterViewInit(): void {
    // console.log(this.childComp);
    // Promise.resolve().then(() => this.message = this.childComp.childMessage);
    this.message = this.childComp.childMessage
  }

  reciveMessage($event:any) {
    this.fromChildOutput = $event;
  }
}
