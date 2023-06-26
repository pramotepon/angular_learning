1.  Component

    - Create Component

      - Create folder navbar
      - Create file navbar.component.ts
      - Import component core
        import { Component } from "@angular/core";
      - Create Class
        class NavbarComponent {
        }
      - Config component
        - กำหนด selector ไว้เรียกใช้งาน (ขึ้นต้นด้วย app-componentName) (เหมือนการสร้าง class ไว้เรียกใช้งานใน css)
          @Component({
          selector: 'app-navbar'
          })
        - กำหนด template การแสดงผลของ Component
          @Component({
          selector: 'app-navbar',
          template: '<h1>Navbar Component</h1>'
          })
      - Export class component
        export class NavbarComponent {
        }
      - Import and declare in root app.module
        - Import
          import { NavbarComponent } from './navbar/navbar.component';
        - Declare
          declarations: [
          AppComponent,
          NavbarComponent
          ],
      - Run Angular
        ng serve
        - Config port
          ng serve -port 4300
      - Load component inside browser
        - ใน app.component.html ให้ใส่ tag ตามชื่อ Selector ที่เรากำหนดไว้ใน Component
          ```
          <app-navbar></app-navbar>
          ```
      - Component properties (Template and style)

        - style
          @Component({
          selector: 'app-navbar',
          template: '<h1>Navbar Component</h1>',
          styles: ['h1{color: red}']
          })
          - Multiple line
            ```
            @Component({
            selector: 'app-navbar',
            template: `
              <h1>Navbar Component</h1>
              <p>Lorem ipsum</p>
              `,
              styles: [`h1{
                color: red;
                font-size: 50px;
              }`]
            })
            ```
        - template (Separate file html and css)
          - สร้างไฟล์ html และ css
            navbar.component.html, navbar.component.css
          - import and declare in ts file
            @Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
            })

      - Generate Components (Angular cli)

        - NG Generate component
          ng g c componentName

      - Life cycle Hook
        - ngOnInit
          Callback life cycle method ที่จะถูกเรียกใช้งานหลังจาก Component นั้นๆถูกเรียกใช้งานเสร็จสิ้นใน Dom
          - ต่างจาก constructor ที่จะทำงานหลังจากที่ class ถูกสร้าง
          - ngOnInit จะใช้งานได้ต้องมีการ import, implement และเรียกใช้งาน
            import { Component, OnInit } from '@angular/core';
            export class PostComponent implements OnInit {
            constructor() { }
            ngOnInit(): void {
            }
            }

2.  Data Binding

    - สร้างตัวแปรใน ts
      export class PostComponent implements OnInit {
      title:string = "List of post";
      constructor() { }
      ngOnInit(): void {
      }
      }
    - เรียกใช้งานใน html
      ```
      <p>{{ title }}</p>
      ```
    - Javascript code in html
      {{ 100 + 200 }}

3.  Share data between component

    - Parent to child Component via @input Decorator
    - Child to parent Component via @Output Decorator

      - Child to parent when there is event, using the @Output Decorator and Event Emitter

    - @Input Decorator
      - สร้างตัวแปรใน parent
        parrentMessage: string = "Message coming from parent component";
      - ใน Child component Import Input และเปิด via @Input รับค่าที่ต้องการ
        import { Component, OnInit, Input } from '@angular/core';
        @Input() fromParent:string = '';
      - ใน Parent html ทำการส่งค่าผ่าน Attribute
        ```
        <app-post [fromParent]="parrentMessage"></app-post>
        ```
      - แสดงค่าใน Child html
        ```
        <p>{{ fromParent }}</p>
        ```
    - @ViewChild Decorator

      - ประกาศตัวแปรใน Child
        childMessage:string = 'From Child Component';
      - ใน Parent ให้ import ViewChild, AfterViewInit และ Component
        import { Component, ViewChild, AfterViewInit } from '@angular/core';
        import { PostComponent } from './post/post.component';
      - ประกาศตัวแปรมารับค่าและเรียกใช้ ViewChild
        message:string = '';
        @ViewChild(PostComponent) childComp!: PostComponent;
      - ใช้งาน Lifecycle
        ngAfterViewInit(): void {
        this.message = this.childComp.childMessage
        }
      - แสดงค่าใน html
        {{ message }}

    - @Output Decorator and Event Emitter
      - Import Output และ EventEmitter
        import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
      - ประกาศตัวแปรใน Child
        outputChildMessage: string = 'Message from child Component Via Output'
      - เรียกใช้งาน Output และ Implements EventEmitter
        @Output() messageEvent = new EventEmitter<string>();
      - สร้าง Method สำหรับส่งข้อมูลออกไป
        sendMessage(){
        this.messageEvent.emit(this.outputChildMessage);
        }
      - ใน html ให้สร้างปุ่มเพื่อเรียกใช้งาน Event
        ```
        <button (click)='sendMessage()'>Click</button>
        ```
      - ใน ts ของ parent ให้สร้าง Method มาเพื่อแสดงค่า
        reciveMessage($event:any) {
          console.log($event);
        }
      - ใน html เรียกใช้งาน Event ที่เราสร้างขึ้นมา และเรียกใช้ Method สำหรับแสดงค่า
        ```
        <app-post [fromParent]="parentMessage" (messageEvent)="reciveMessage($event)"></app-post>
        ```
      - ลองให้แสดงข้อความใน HTML โดย สร้างตัวแปรมารับค่า และแสดงผลออกไป
        - Variable
          fromChildOutput:string = '';
        - Method
          reciveMessage($event:any) {
          this.fromChildOutput = $event;
          }
        - HTML
        ```
        <p>{{ fromChildOutput }}</p>
        ```

4.  Display data and event handeling.

    - Angular data binding methods

      - Scope

        - HTML Scope
        - CSS Scope
        - JavaScript Scope

      - String interpolation
        - ประกาศตัวแปร
          message: string = 'Message From Typescript Component File';
        - เรียกใช้ตัวแปรที่สร้าง
          {{ message }}
      - Property binding
        - สร้างตัวแปรเก็บค่า Property
          imgUrl: string = 'https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg';
        - แสดงค่า Property ใน html
          ```
          <img [src]="imgUrl" alt="" />
          ```
      - Class Binding
        - สร้าง Css
          .text-red{
          color: red;
          }
        - ประกาศ Boolean
          bool:boolean = true;
        - เรียกใช้งาน class ใน html กำหนด value เป็น boolean ของเรา
          ```
          <h1 [class.text-red] = "bool">{{ message }}</h1>
          ```
      - Style Binding (https://www.w3schools.com/jsref/dom_obj_style.asp)
        - ประกาศ Boolean
          bool:boolean = true;
        - เขียน Style ใน html การเขียนดูจาก https://www.w3schools.com/jsref/dom_obj_style.asp
          ```
          <h1 [style.color]="bool? 'red' : 'blue'">Style Binding</h1>
          ```

    - Angular Two-Way Data Binding
      - ส่งจาก ts มา html และส่งจาก html มา ts
    - How to Handle Events in Angular

      - Event Binding
        - สร้าง Method event
          buttonClick() {
          console.log('Button Click Event worked');
          }
        - เรียกใช้ Method ใน HTML
          ```
          <button (click)="buttonClick()">Click me</button>
          ```
      - Event Filtering (keyCode เอาไว้เช็คการ Enter หรืออะไรต่างๆที่ไม่ใช่ตัวอักษรธรรมดาก็ได้)
        - เขียน Method event
          onKeyup($event:any) {
            if($event.keyCode == 13){
          console.log('Enter key pressed.');
          }
          }
        - เขียน Input สำหรับเรียกใช้ Method
          ```
          <input type="text" (keyup)="onKeyup($event)">
          ```
        * สามารถเขียนแบบสั้นๆได้โดย
          - เขียน Method event
            onKeyup() {
            console.log('Enter key pressed.');
            }
          - เขียน Input สำหรับเรียกใช้ Method
            ```
            <input type="text" (keyup.enter)="onKeyup()">
            ```

    - Template variable
      - สร้าง Method ใน ts
        onKeyup(username: any) {
        console.log(username);
        }
      - เรียกใช้ Method ใน html
        ```
        <input type="text" (keyup.enter)="onKeyup(usename.value)" #usename>
        ```

5.  Two ways data binding.

    - สร้างตัวแปรในไฟล์ ts
      userName: string = '';
    - สร้าง Method เพื่อเรียกใช้
      onKeyup() {
      console.log(this.userName);
      }
    - สร้าง Input พร้อมเรียกใช้ ngModel
      ```
      <input type="text" [(ngModel)]="userName" (keyup.enter)="onKeyup()" />
      ```
    - Import และเรียกใช้ Module
      import { FormsModule } from '@angular/forms';
      imports: [
      FormsModule,
      ],

6.  One-way vs two-way data binding.

    - One-way
      - สิ่งที่ใช้เพื่อ One-way data binding
        1. String Interpolation - {{title}}
        2. Property Binding - [src]
        3. Class Binding - [class.text-red]
        4. Style Binding - [style.backgroundColor]
      - Can only bind data component to view.
        - สร้างตัวแปรใน component และลองสร้าง Method
          textValue: string = "Value is coming from component";
          onKeyup() {
          console.log(this.textValue);
          }
        - สร้าง Input ใน html เพื่อรับค่า value และทดสอบ one-way binding
          ```
          <input type="text" value="one way data binding" />
          <input type="text" [value]="textValue" (keyup.enter)="onKeyup()" />
          ```
    - Two-way
      1. Two-way Binding - [(ngModel)]
      - Can bind data component to view and vice versa
        - สร้างตัวแปรใน component และลองสร้าง Method
          textValue: string = "Value is coming from component";
          onKeyup() {
          console.log(this.textValue);
          }
        - สร้าง Input พร้อมเรียกใช้ ngModel
        ```
        <input type="text" [(ngModel)]="textValue" (keyup.enter)="onKeyup()" />
        ```

7.  Data binding and events (Task)

8.  Angular Directive
    # What is angular Directive and How to use.
        - An angular directive is special type of technology that can manipulate the DOM object.
        - Directive can do adding html elements removing html elements from DOM dynamically.
    # Type of Angular Directive
        1. Component Directive
            - Which is an angular directive with a template view.
        2. Structural Directive
            - Which can change the DOM layout by adding and removing DOM elements.
        3. Attribute Directive
            - Which can change the appearance or behavior of an element, component, or another directive.
        4. Custom Directive
            - Which can create our custom directive from scratch.
    # About
        - ngIf Directive.
        - ngTemplate Directive.
        - ngSwitchCase Directive.
        - ngFor Directive.
            1. We use ngFor Directive to Render an Array inside the View.
            2. NgFor Directive is a Structural Directive.
            3. With NgFor Directive we can Manipulate The DOM.
            - ตัวอย่างการใช้งาน
              - Array
                - สร้างตัวแปรใน Component ts
                  postArray: Array<string> = ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5'];
                - เรียกใช้งาน ngFor ใน html
                  ```
                  <ul>
                    <li *ngFor="let post of postArray">{{ post }}</li>
                  </ul>
                  ```
              - Object Array
                - สร้างตัวแปรใน Component ts
                  objArray: Array<any> = [
                    { id: 1, postTitle: 'Post 1' },
                    { id: 2, postTitle: 'Post 2' },
                    { id: 3, postTitle: 'Post 3' },
                    { id: 4, postTitle: 'Post 4' },
                    { id: 5, postTitle: 'Post 5' },
                  ];
                - เรียกใช้งาน ngFor ใน html
                  ```
                  <ul>
                    <li *ngFor="let post of objArray">{{ post.postTitle }}</li>
                  </ul>
                  ```
            - Change Direction (Add and Delete)
              - สร้าง Method Add และ Delete
                addNew() {
                  this.objArray.push({
                    id: 6,
                    postTitle: 'Post 6'
                  });
                }
                onDelete(id: number){
                  this.objArray.splice(id, 1);
                }
              - ใน html สร้างปุ่ม Add และ Delete
                <button (click)="addNew()">Add new data</button>
                <ul>
                  <li *ngFor="let post of objArray; let index = index">
                    {{ post.postTitle }}
                    <button (click)="onDelete(index)">Delete</button>
                  </li>
                </ul>
    # Learn About ngClass & ngStyle Directive.
    # Learn Difference of Structural and Attribute Directive.
