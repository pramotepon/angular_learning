import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../Services/post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  title: string = "List of post";
  messagePost: string = "Message post";

  postParentMessage: string = "Message coming from the post parent.";
  childMessage: string = 'From Child Component';
  outputChildMessage: string = 'Message from child Component Via Output';

  posts: Array<any> = [];

  @Input() fromParent: string = '';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private postService: PostService) {
    // let postService = new PostService();
    this.posts = postService.postList;
  }
  ngOnInit(): void {

  }

  // Method
  sendMessage() {
    this.messageEvent.emit(this.outputChildMessage);
  }
  addNewData(){
    let newPost = {
      id: 7,
      postTitle: "Post 7"
    }
    this.postService.addPost(newPost);
  }
}
