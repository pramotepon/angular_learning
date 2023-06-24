import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title: string = "List of post";
  messagePost: string = "Message post";

  postParentMessage:string = "Message coming from the post parent.";
  childMessage:string = 'From Child Component';
  outputChildMessage: string = 'Message from child Component Via Output'

  @Input() fromParent:string = '';
  @Output() messageEvent = new EventEmitter<string>();

  constructor() {
  }
  ngOnInit(): void {

  }

  // Method
  sendMessage(){
    this.messageEvent.emit(this.outputChildMessage);

  }
}
