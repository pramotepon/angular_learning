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
            - ตัวอย่างการใช้งาน
              - เรียกใช้ ngIf ใน html
                ```
                <div *ngIf="objArray.length > 0">
                  <ul>
                    <li *ngFor="let post of objArray; let index = index">
                      {{ post.postTitle }}
                      <button (click)="onDelete(index)">Delete</button>
                    </li>
                  </ul>
                </div>
                <div *ngIf="objArray.length == 0">
                  <p>There is no Data to fetch ...</p>
                </div>
                ```
        - ngTemplate Directive.
            - เรียกใช้งาน ng-template แล้วกำหนดชื่อของ template
              ```
              <!-- ng-template directive -->
              <div *ngIf="objArray.length > 0; else noData">
                <ul>
                  <li *ngFor="let post of objArray; let index = index">
                    {{ post.postTitle }}
                    <button (click)="onDelete(index)">Delete</button>
                  </li>
                </ul>
              </div>
              <ng-template #noData>
                <p>There is no Data to fetch ...</p>
              </ng-template>
              ```
            - หรือนำ template มาใช้งานกับเงือนไข if ได้โดยใช้ then
              ```
              <div *ngIf="objArray.length > 0; then postList else noData"></div>
              <ng-template #postList>
                <ul>
                  <li *ngFor="let post of objArray; let index = index">
                    {{ post.postTitle }}
                    <button (click)="onDelete(index)">Delete</button>
                  </li>
                </ul>
              </ng-template>
              <ng-template #noData>
                <p>There is no Data to fetch ...</p>
              </ng-template>
              ```
        - ngSwitchCase Directive.
            - ตัวอย่างการใช้งาน
              - สร้างตัวแปรจัดการ case ต่างๆ
                stepForm: string = "";
              - สร้าง Method เพื่อจัดการ case
                onClick(status: string){
                  this.stepForm = status;
                }
              - สร้าง html ปุ่มเมื่อคลิ๊กให้เปลี่ยนแปลง case
                <div>
                  <button (click)="onClick('step 1')">Step 1</button>
                  <button (click)="onClick('step 2')">Step 2</button>
                  <button (click)="onClick('step 3')">Step 3</button>
                </div>
              - สร้าง html สำหรับ Switch case ต่างๆตามตัวแปร stepForm และ Default
                <div [ngSwitch]="stepForm">
                  <div *ngSwitchCase="'step 1'">Step 1 From</div>
                  <div *ngSwitchCase="'step 2'">Step 2 From</div>
                  <div *ngSwitchCase="'step 3'">Step 3 From</div>
                  <div *ngSwitchDefault>Somthing Else</div>
                </div>
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

    - NgStyle Directive
      - สร้างตัวแปรใน Component มาจัดการ boolean
        isActive: boolean = true;
      - เขียน html แบบ style
        ```
        <h1
          [style.color]="isActive ? 'red' : 'black'"
          [style.textTransform]="isActive ? 'uppercase' : 'lowercase'"
        >
          Hello Angular
        </h1>
        ```
      - หรือ เขียนแบบใช้ ngStyle (Clean)
        ```
        <h1
          [ngStyle]="{
            color: isActive ? 'red' : 'black',
            textTransform: isActive ? 'uppercase' : 'lowercase'
          }"
        >
          Hello Angular
        </h1>
        ```
    - NgClass Directive
      - การเขียนแบบ Class ดีกว่าแบบ inline style
        - เขียน html แบบ class
          ```
          <h1 [class.main]="isActive" [class.text-weight]="isActive">Hello Angular</h1>
          ```
        - เขียน html แบบ ngClass (Clean)
          ```
          <h1
            [ngClass]="{
              'main' : isActive,
              'text-weight': isActive
            }"
          >
            ngClass Directive
          </h1>
          ```

    # Learn Difference of Structural and Attribute Directive.

    - Structural Directive คืออะไร?
      - With The Structural Directive we can manipulate the DOM (Document Object Model) by adding and removing HTML Elements to the DOM.
        - Document Object Model by adding and removing HTML Elements to the DOM
        - With the learning \* Symbol we can Easily Identify a Structural Directive
      1. Responsible for the HTML Layout.
      2. Shape or Reshape the DOM Structure by adding and removing HTML Element.
      3. Can Identyfy With leading \* Symbol
      4. Structural Directive -
         *ngFor
         *ngIf
         \*ngSwitchCase
    - Attribute Directive คืออะไร?
      - With The Attribute Directive we can only change the Appearance of the DOM (Document Object Model)
      1. Change the Appearance or the behavior of a DOM Element
      2. Attribute Directive -
         ngStyle
         ngClass

9.  Angular PIPES

# What is angular Pipe and How to use.

    1. What is an Angular pipe?
      - Pipes are used to transforming data into a particular format when we only need that data tranformed 'in' a template. or the HTML view.
        - Angular - inbuilt pipes
          1. Uppercase Pipe
            ```
            <h1>{{ title | uppercase }}</h1>
            ```
          2. Lowercase Pipe
            ```
            <h1>{{ title | lowercase }}</h1>
            ```
          3. Decimal / Number Pipe
            ```
            <h1>{{ count | number }}</h1>
            <h1>{{ dcValue | number : "1.2-2" }}</h1>
            <h1>{{ dcValue | number : "2.2-2" }}</h1>
            ```
          4. Currency Pipe
            ```
            <h1>{{ price | currency : "JPY" }}</h1>
            <h1>{{ price | currency : "JPY" : false }}</h1>
            <h1>{{ price | currency : "JPY" : false : '2.1-1' }}</h1>
            ```
          5. Date Pipe
            - เขียน Date ปัจจุบันใน Componen ts
            ```
            today: Date = new Date();
            ```
            - เรียน Pipe ใน HTML
            ```
            <h1>{{ today | date: 'short' }}</h1>
            <h1>{{ today | date: 'shortDate' }}</h1>
            ```
          6. JSON Pipe
            - เขียน object ใน Component ts
              ```
              postObj: object = {
                id: 1,
                postTitle: "Post1"
              }
              ```
            - เรียกใช้ Json pipe ใน HTML
              ```
              <p>{{ postObj | json }}</p>
              ```
          7. Percent Pipe
            ```
            <h3>{{ 0.567 | percent }}</h3>
            <h3>{{ 5 | percent : "1.1-1" }}</h3>
            ```
          8. Slice Pipe
            - สร้าง Array ใน Component ts
              ```
              postArray: Array<string> = [
                "post 1",
                "post 2",
                "post 3",
                "post 4",
                "post 5",
              ]
              ```
            - เรียก pipe slice ใน html
              ```
              <h3>{{ postArray | slice : 0 : 3 }}</h3>
              ```

# What are the inbuilt Pipes in Angular.

# How to pass parameters to an Angular Pipe.

# How to create a custom Pipe from scratch.

    - Custom pipe
      - สร้าง Folder Pipes ใน Path ที่เราต้องการเรียกใช้งาน pipe
      - สร้างไฟล์ pipeName.pipe.ts
        - import Pipe และ Pipe tranform
          ```
          import { Pipe, PipeTransform } from "@angular/core";
          ```
        - กำหนดชื่อเรียกใช้งาน Pipe
          ```
          @Pipe({ name: 'append' })
          ```
        - สร้าง export class โดยทำการ implements PipeTransform มาใช้งาน
          ```
          export class AppendPipe implements PipeTransform {

          }
          ```
        - เขียน Method เพื่อกำหนด Format ที่จะ return ใน pipe
          ```
          transform(value: any, ...args: any[]) {
            return "City Name: " + value;
          }
          ```
      - Register module pipe ของเราใน app.module
        - import pipe
          ```
          import { AppendPipe } from './Pipes/append.pipe';
          ```
        - Register ใน declarations
          ```
          AppendPipe,
          ```
      - เรียกใช้งานใน html
        ```
        <h3> {{ userDetail.city | append }}</h3>
        ```
    - Generate custom pipe using angular cli
      - พิมพ์ command
        ng g pipe Pipes/appendCLI
      - เขียน format return ที่เราต้องการใน pipe.ts
        ```
        import { Pipe, PipeTransform } from '@angular/core';
        @Pipe({
          name: 'appendCLI'
        })
        export class AppendCLIPipe implements PipeTransform {

          transform(value: unknown, ...args: unknown[]): unknown {
            return "City Name: " + value;
          }
        }
        ```
      - เรียกใช้งาน pipe ใน HTML
        ```
        <h3> {{ userDetail.city | appendCLI }}</h3>
        ```
    - Custom pipe with aggruments
      - พิมพ์ command
        ng g pipe Pipes/summary
      - ลองสร้างตัวแปรเก็บข้อความยาวๆ
        ```
        dummyText: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
        ```
      - เขียน format return ที่เราต้องการใน pipe.ts และแก้ไขค่า Parametter (ถ้าไม่มีการส่ง Aggrument มา จะกำหนด Default เป็น 20)
        ```
        transform(value: string, length: number = 20): unknown {
          return value.substring(0, length);
        }
        ```
      - เรียกใช้งาน pipe ใน HTML และลองส่งค่าไปโดยใช้เครื่องหมาย | (pipe)
        ```
        <p>{{ dummyText | summary : 10 }}</p>
        ```

10. Angular Services

# What is Angular services and How to use?

    - รับส่งข้อมูลได้โดยไม่ต้องสนใจ Relation
    - (Component - 1 No Relationship) -> (Share Data Angular Service) -> Other Component [Component 2, Component 3, Component 3]
    - Usage of Angular Services
      - Simply be use Angular Services, to share data and common methods among components whether there is relationship between components or not ...

# How to create Angular service from scratch?

    - Create Angular service.
      - Create folder Services
      - Create file post.service.ts
        - เขียน class export ใน file service.ts
          ```
          export class PostService {
            postList: Array<any> = [
              {
                id:1,postTitle: "Post 1"
              },
              {
                id:2,postTitle: "Post 2"
              },
              {
                id:3,postTitle: "Post 3"
              },
              {
                id:4,postTitle: "Post 4"
              },
              {
                id:5,postTitle: "Post 5"
              },
              {
                id:6,postTitle: "Post 6"
              },
            ]
          }
          ```

# Generate Angular Services using Angular CLI?

- Create
  - พิมพ์คำสั่งใน Terminal
    ng g s services/user
- Usage of angular CLI
  - สร้างปุ่มมาเพื่อ add post
    ```
    <button (click)="addNewData()">Add New</button>
    ```
  - เขียน Method function ใน service โดยรับ Parameter 1 ค่าชื่อว่า data
    ```
    addPost(data: any) {
      this.postList.push(data)
    }
    ```
  - เขียน Method function ใน post component
    ```
    addNewData(){
      let newPost = {
        id: 7,
        postTitle: "Post 7"
      }
      this.postService.addPost(newPost);
    }
    ```
  - เราสามารถเขียน CRUD ได้ใน Service file

# What is Dependency Injection and How to use?

- การ Pass ข้อมูลจาก Service ไปแสดง
  - Import Service ใน file Component ที่เราต้องการใช้
    ```
    import { PostService } from '../Services/post.service';
    ```
  - ลงทะเบียน Services ของเราใน Component providers
    ```
    @Component({
      selector: 'app-post',
      templateUrl: './post.component.html',
      styleUrls: ['./post.component.css'],
      providers: [PostService]
    })
    ```
  - สร้างตัวแปรเพื่อรับค่าที่จะ assign มาจาก Service
    ```
    posts: Array<any> = [];
    ```
  - ใน Constructor ให้ new instance Service ของเรามาแบบ Dependency Injection และนำค่ามา Assign
    ```
    constructor(private postService: PostService) {
      this.posts = postService.postList;
    }
    ```
  - Loop ใช้งานใน HTML ของ Component
    ```
    <ul>
      <li *ngFor="let post of posts">{{ post.postTitle }}</li>
    </ul>
    ```
  - เรียกใช้งาน Component นั้น
    ```
    <app-post></app-post>
    ```
- DI Providers & Injectable Decorator
  - การ Accessed service Only from this component class
    - Generate component ใน Terminal
      ng g c post-list
    - ลงทะเบียน Services ของเราใน Component providers
      ```
      @Component({
        selector: 'app-post-list',
        templateUrl: './post-list.component.html',
        styleUrls: ['./post-list.component.css'],
        providers: [PostService]
      })
      ```
    - เขียน constructor ให้ instanct service มาและ assign ค่า
      ```
      constructor(private postService: PostService) {
        this.postList = postService.postList;
      }
      ```
    - Import และลงทะเบียน declarations ใน app module
      ```
      import { PostListComponent } from './post-list/post-list.component';
      declarations: [
        PostListComponent,
      ],
      ```
    - เรียกใช้ Component ใน html
      ```
      <app-post-list></app-post-list>
      ```
- Best practic (ไม่ต้องทำการลงทะเบียนทุกครั้งแต่ทำเพียงแค่ครั้งเดียว)
  - ทำเหมือนด้านบน แต่ลบส่วนของการลงทะเบียน Services ของเราใน Component providers ออกแล้วเปลี่ยนเป็นนำ Service ไปลงทะเบียนใน app module แทนในส่วนของ providers
    ```
    import { PostService } from './Services/post.service';
    providers: [
      PostService
    ],
    ```
  - เขียน Inject decorator class ใน Service
    - import และกำหนดให้ Injectable กับ root app
      ```
      import { Injectable } from "@angular/core"
      @Injectable({ providedIn: 'root' })
      ```

# What is Data modeling and Angular interface?

    - เพื่อกำหนด Format หรือ Blueprint ของข้อมูล
    - ทำการสร้าง Interface โดยใช้ CLI ไฟล์ Interface จะอยู่ใน Folder models
      ng g i models/post
    - กำหนดรูปแบบของข้อมูลในไฟล์ interface ที่เรา generate มา
      ```
      export interface Post {
        id: number,
        postTitle: string,
      }
      ```
    - Import Interface มาใช้งานใน Component ที่ต้องการ
      ```
      import { Post } from '../models/post';
      ```
    - แล้วทำการเรียกใช้ Interface โดยระบุเป็นรูปแบบของ type
      ```
      addNewData(){
        let newPost: Post = {
          id: 7,
          postTitle: "Post 7"
        }
        this.postService.addPost(newPost);
      }
      ```
    - ใน Interface เราสามารถกำหนด field ให้เป็น optional ได้โดยใช้เครื่องหมาย ? ต่อท้ายชื่อ field
      export interface Post {
        id: number,
        postTitle: string,
        date?: Date
      }

11. Angular template-driven forms

# What are the form types in Angular?

    1. Template - Driven Form
      - ใช้ Angular directive (ngForm)
      - Full control of the form and we can validate.
    2. Reactive Form.
      - เขียนเองทั้งหมด

# What is template driven form and how to use that?

    - Create Bootstrap form.
      - เขียน HTML
      - import bootstrap cdn
    - ng Form directive
      - import { FormsModule } from '@angular/forms';
      - ประกาศชื่อ Form และกำหนด submit โดยส่งชื่อ Form เข้าไป ใน html
        ```
        <form #f="ngForm" (submit)="onSubmit(f)">
        ```
      - สร้าง Method สำหรับรับการ submit โดยรับค่า 1 ค่ามี type เป็น NgForm
        ```
        onSubmit(f:NgForm){
          console.log(f);
        }
        ```
    - ngForm Explained and FormGroup class
      - Handle forms data มี 2 แบบ
        1. FormGroup Class    ->  Form tags (ngForm)
        2. FormControl Class  ->  Input fields (ngModel)
          - สร้างได้ 2 วิธีคือ
            1. ประกาศ Instanct class formControl()
            2. ใช้ ngForm
    - ngModel and FormControl class
      - การใช้ ngModel สามารถใช้ชื่อของ input แทนการประกาศชื่อใน ngModel ได้
        ```
        <input
          type="text"
          placeholder="Full name"
          class="form-control"
          name="firstName"
          ngModel
        />
        ```

# How to Vilidate forms user inputs?

    - กำหนด Validate ข้อมูล
      - ประกาศชื่อ Model และเรียกใช้คำสั่ง Change
        ```
        <input
          type="text"
          placeholder="Full name"
          class="form-control"
          name="firstName"
          ngModel
          #firstName='ngModel'
          (change)="getValue(firstName)"
          required
        />
        ```
      - import FormControl และสร้าง Funciton onChange โดยรับค่า 1 ค่ามี type เป็น any
        ```
        import { FormControl, NgForm } from '@angular/forms';
        getValue(f: any) {
          console.log(f);
        }
        ```
      - แสดงผล Valid ข้อมูล
        - ใช้ ngIf ในการเช็ด โดยใช้ชื่อ model ของ input.method
          - invalid ตรวจสอบข้อผิดพลาด
          - touched ในการเช็คว่ามีการ Focus แล้วหรอไม่
        ```
        <div class="alert alert-danger" *ngIf="firstName.touched && firstName.invalid">
          First name is required.
        </div>
        ```
    - Styling invalid inputs
      - เขียน css โดยใน Angular จะมีการเพิ่ม class ให้ในส่วนของ input ไว้ใช้งาน
        ```
        .form-control.ng-touched.ng-invalid{
          border: 2px solid red;
        }
        ```
      - use Class binding
        ```
        [ngClass]="{ 'is-invalid': firstName.touched && firstName.invalid }"
        ```
    - Validation types
      - กำหนดเงื่อนไข minlength maxlength ใน HTML
        ```
        minlength="5"
        maxlength="10"
        ```
      - ใช้ ngIf เช็ค Error ตามเงื่อนไข
        ```
        <div *ngIf="firstName.errors?.['required']">
          <div
            class="alert alert-danger"
            *ngIf="firstName.touched && firstName.invalid"
          >
            First name is required.
          </div>
        </div>
        <div *ngIf="firstName.errors?.['minlength']">
          <div
            class="alert alert-danger"
            *ngIf="firstName.touched && firstName.invalid"
          >
            First name must be atleast 5 charactor long.
          </div>
        </div>
        ```
    - Email input field
      - using attribute pattern
        ```
        <input
          type="email"
          placeholder="Email"
          class="form-control"
          name="email"
          ngModel
          #email="ngModel"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          required
        />
        ```
      - แสดงผล Error แบบด้านบนเพียงแค่เปลี่ยนเป็นชื่อที่ binding
        ```
        <div *ngIf="email.errors?.['required']">
          <div
            class="alert alert-danger"
            *ngIf="email.touched && email.invalid"
          >
            Email is required.
          </div>
        </div>
        <div *ngIf="email.errors?.['pattern']">
          <div
            class="alert alert-danger"
            *ngIf="email.touched && email.invalid"
          >
            Invalid email address ...
          </div>
        </div>
        ```
    - Address Text area
      - เหมือนกับส่วนของ input ทั่วไป
    - Form Submission
      - เปลี่ยน (submit) ให้เป็น ngSubmit

# How to control Enable/Disable state of a button?

- On invalid form
  - จะเห็นว่าต่อให้เช็คค่าแล้วแต่ก็ยังทำงานในฟังก์ชั่นได้อยู่ดี
  - ใส่ disabled ใน button
  ```
  <button type="submit" class="btn btn-primary" [disabled]="f.invalid">Submit</button>
  ```

12. Angular reactive forms

# What is reactive forms & How to use them.

    - Form setup
      1. import ReactiveFormsModule ในไฟล์ module
        import { FormsModule, ReactiveFormsModule } from '@angular/forms';
      2. Register ในส่วนของ imports
        imports: [
          ReactiveFormsModule
        ],
      3. เขียน Form ใน HTML
      4. import FormGroup และ FormControl ใน component
        import { FormControl, FormGroup } from '@angular/forms';
      5. ประกาศตัวแปร form type เป็น any
        form: any;
      6. ใน Constructor instanct FormGroup โดยส่งค่าเป็น object key เป็นชื่อ data และ value เป็น Instanct FormControl()
        ```
        this.form = new FormGroup({
          firstName: new FormControl(),
          email: new FormControl(),
          address: new FormControl()
        });
        ```
      7. ใน HTML ทำการ bind [formGroup] = form ที่เราทำการ instanct ไว้ใน Component
        ```
        <form [formGroup]="form">
        ```
      8. กำหนด formControlName ให้กับ input ต่างๆใน html
        ```
        formControlName="firstName"
        ```

# How to validate a reactive form?

    1. ไฟล์ component ใน FormControl กำหนด initial value = '' และกำหนดเงื่อนไขการ validate ต่างๆใน parameter ที่ 2
    ```
    this.form = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl(),
      address: new FormControl()
    });
    ```
    2. เขียน method get เพื่อส่งค่าไปให้ HTML
    ```
    get fullname(){
      return this.form.get('fullName');
    }
    ```
    3. เขียนเงื่อนไขและจัดการกับ validate
    ```
    <div
      class="alert alert-danger"
      *ngIf="fullname.touched && fullname.invalid"
    >
      <div *ngIf="fullname.errors?.required" >Required</div>
      <div *ngIf="fullname.errors?.minlength" >Length</div>
    </div>
    ```
    - การเขียน pattern
      1.  สร้างตัวแปรกำหนดเงื่อนไข
      ```
      emailRegex: string = "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$";
      ```
      2.  เขียน validate pattern โดยใส่ค่าเงื่อนไขเข้าไป
      ```
      Validators.pattern(this.emailRegex)
      ```
      ** หรือใช้ Validators.email ก็ได้
      3. เขียน method get Email
      ```
      get Email(){
        return this.form.get('email')
      }
      ```
      4. เขียนเงื่อนไขและจัดการกับ validate
      ```
      <div
          class="alert alert-danger"
          *ngIf="Email.touched && Email.invalid"
      >
        <div *ngIf="Email.errors?.required" >Required</div>
        <div *ngIf="Email.errors?.email" >Pattern</div>
      </div>
      ```

# How to get Data From Reactive Forms?

      1. กำหนด disabled ให้ submit button
      ```
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Submit</button>
      ```
      2. กำหนด ngSubmit ให้กับ form
      ```
      <form [formGroup]='form' (ngSubmit)="onSubmit()">
      ```
      3. เขียน method เพื่อให้ form ใช้งาน และแสดงผลค่า value
      ```
      onSubmit(){
        console.log(this.form.value);
      }
      ```

# How to nest form group?

    1. กำหนด FormGroup validate ใน component
    ```
    constructor() {
      this.form = new FormGroup({
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        email: new FormControl('', [
          Validators.required,
          // Validators.pattern(this.emailRegex)
          Validators.email
        ]),
        contactDetails: new FormGroup({
          address: new FormControl('', Validators.required),
          shippingAddress: new FormControl(),
          contactNo: new FormControl()
        })
      });
    }
    ```
    2. เขียน Method return ค่านั้น
    ```
    get Address(){
      return this.form.get('contactDetails.address')
    }

    get ShippingAddress(){
      return this.form.get('contactDetails.shippingAddress')
    }

    get Contact(){
      return this.form.get('contactDetails.contactNo')
    }
    ```
    3. เขียน html element มาครอบ group ของ input ไว้
    ```
    <div formGroupName="contactDetails">
    ```
    4. เช็ค Validate ปกติได้เลย
    ```
    <div class="form-group">
        <label>Address</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="Address"
            class="form-control"
            name="address"
            formControlName="address"
          ></textarea>
          <div
            class="alert alert-danger"
            *ngIf="Address.touched && Address.invalid"
          >
        <div *ngIf="Address.errors?.required">Required</div>
      </div>
    </div>
    ```

# Reactive Form Arrays, Form Builders.

    - Form Arrays
      - import FormArray
        import { FormArray } from '@angular/forms';
      - เขียน FormArray ใน component
        skills: new FormArray([])
      - เขียน Method สำหรับรับค่ามาเก็บเข้า Array
        ```
        addSkills(skills: HTMLInputElement){
          this.Skills.push(
            new FormControl(skills.value)
          );
          skills.value = '';
          console.log(this.form.value);

        }
        ```
      - เขียน getter สำหรับแสดงข้อมูลของ Array
        ```
        get Skills(){
          return this.form.get('skills') as FormArray;
        }
        ```
      - เขียน HTML สำหรับกรอกข้อมูลเพื่อบันทึกและแสดงผล
        ```
        <div class="form-group">
          <label for="">skills</label>
          <input
            type="text"
            class="form-control"
            #skill
            (keyup.enter)="addSkills(skill)"
          />
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let skill of Skills.controls">
              {{ skill.value }}
            </li>
          </ul>
        </div>
        ```
      - การ Remove array
        - ใน ngFor รับประกาศตัวแปรเพื่อรับค่า index ด้วย
          ```
          <li class="list-group-item" *ngFor="let skill of Skills.controls; let i = index">
          ```
        - สร้างปุ่มสำหรับลบ เรียกใช้ Method removeSkills พร้อมส่งค่า index เข้าไป
          ```
          <a class="btn btn-sm btn-danger" (click)="removeSkills(i)"> X </a>
          ```
        - เขียน Method สำหรับลบค่าออกจาก Array โดยเรียกใช้งาน Method removeAt
          ```
          removeSkills(index: number){
            this.Skills.removeAt(index)
          }
          ```
    - Form Builder (Clean code)
      - เนื่องจากการใช้ FormControl และการสร้าง Getter เพื่อ Binding ค่านั้นต้องเรียกใช้งานซ้ำๆ
        - import FormBuilder
          ```
          import { FormBuilder } from '@angular/forms';
          ```
        - ใน constructor ประกาศตัวแปร fb มี type เป็น FormBuilder (fb จะมี method array, control และ group ให้เลือกใช้)
          ```
          constructor(fb: FormBuilder)
          ```
        - เรียกใช้งาน method group แล้วส่งค่า เข้าไปเป็น array [initialValue, [Validate]] มาเก็บไว้ที่ตัวแปร this.form ที่เราประกาศไว้
          ```
          this.form = fb.group({
            fullName: ['', [
              Validators.required,
              Validators.minLength(5)
            ]],
            email: ['', [
              Validators.required,
              Validators.email
            ]],
            contactDetails: fb.group({
              address: ['', Validators.required],
              shippingAddress: ['', Validators.required],
              contactNo: ['', [
                Validators.required,
                Validators.pattern(this.contactRegex)
              ]]
            }),
            skills: fb.array([])
          })
          ```
        - จะเห็นว่า Code ดูสั้นและเรียบร้อยขึ้น

# Custom Form Validators.

    - username without space
      - Inject form builder ใน constructor
      ```
      constructor(fb: FormBuilder)
      ```
      - เขียนเงื่อนไข validate ต่างๆใน constructor
      ```
      this.form = fb.group({
        username: ['', [
          Validators.required,
          Validators.minLength(5)
        ]],
        password: ['', Validators.required]
      })
      ```
      - เขียน getter method แค่ครั้งเดียว
      ```
      get fc(){
        return this.form.controls
        // this.fc.username
        // this.fc.password
      }
      ```
      - เขียน html สำหรับทดสอบ validate
      ```
      <div class="container">
        <form [formGroup]="form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" formControlName="username" />
            <div
              class="alert alert-danger"
              *ngIf="fc.username.touched && fc.username.invalid"
            >
              <div *ngIf="fc.username.errors?.required">Required</div>
              <div *ngIf="fc.username.errors?.minlength">Length</div>
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" formControlName="password" />
            <div
              class="alert alert-danger"
              *ngIf="fc.password.touched && fc.password.invalid"
            >
              <div *ngIf="fc.password.errors?.required">Required</div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      ```
      - สร้าง Folder validators ใน app/
      - สร้างไฟล์ nospace.validators.ts
      - ในไฟล์ validators เขียนเงื่อนไขที่ต้องการตรวจสอบลงไป
        - import AbstractControl, ValidationErrors
          ```
          import { AbstractControl, ValidationErrors } from "@angular/forms";
          ```
        - สร้าง export class ขึ้นมา
          ```
          export class noSpace {
            // สร้าง static method ขึ้นมาโดยรับค่า 1 ค่ามี type เป็น AbstractControl และ return ValidationErrors หรือ null กลับไป
            static noSpaceValidations(control: AbstractControl): ValidationErrors | null {
              // สร้างตัวแปรมารับค่าของ value ที่ส่งมาพร้อมแปลงเป็น string
              let controlValue = control.value as string;
              // เช็คเงื่อนไข
              if (controlValue.indexOf(' ') >= 0) {
                // ส่งค่ากลับไปเพื่อใช้ validate
                return { noSpaceValidations: true }
              } else {
                return null;
              }
            }
          }
          ```

13. Angular Routing & Navigation

# What is Angular routing & navigation?

    - Routing is basically means navigating between pages.

# How to implements an angular routing From Scratch?

    - We Use Angular Routers Navigate through Components.
    - Router is a main building core module of an Angular Framework.
    - This Includes bunch of directives and modules which help us to implement Routing & Navigation.
    - Implement Steps
      1. Configure the Routes.
      2. Add Router-Outlet
      3. Add navigation link paths.
      - ng g c post-list
      - register angular router ใน imports ของไฟล์ app module และเรียกใช้ method forRoot() โดยส่งค่า array Object เข้าไป [{path: '', component: componentName}]
        ```
        import { RouterModule } from '@angular/router';
        RouterModule.forRoot([
          { path: 'posts', component: PostListComponent }
        ])
        ```
      - เขียน Router Outlet ใน html
        ```
        <router-outlet></router-outlet>
        ```
      - ใช้ routerLink ในการ Navigate path
        ```
        <button routerLink="/posts">Post List</button>
        ```
      - Base Url จะถูกกำหนดไว้ใน index.html
        ```
        <base href="/">
        ```
      - Base Router
        - generate component ใหม่
          ```
          ng g c home
          ```
        - Setting ใน RouterModule ได้เลย 
          ```
          { path: '', component: HomeComponent },
          ```
      - RouterLink Active
        - เขียน Css สำหรับ class เมื่อ Active
        - ใช้ routerLinkActive ในการจัดการในหน้า HTML
          ```
          routerLinkActive="active"
          ```
# How to pass Router Parameters & Query Parameters?
  - Parameter Variables
    - การบอกว่าจะต้องมีการส่ง Parameter มาด้วยใน Path ทำได้โดยใช้ :paramsName
    ```
      post/:id
    ```
    - การส่งจะใช้ [routerLink]="['/post', index]" (index คือ pk หรือ index ที่เรา Loop มา)
    - Get Router Parameters
      - import ActivatedRoute
        import {ActivatedRoute} from '@angular/router'
      - Inject Activate route ใน Constructor เป็น private route
        ```
        constructor(private route: ActivatedRoute)
        ```
      - Access
        ```
        this.route.paramMap.subscribe(value=>{
          // console.log(value);
          let id = value.get('id')
          console.log(id);
        })
        ```
# What is Observable & How to use that?
  - An Observable is a sequence of data that is emitted data async or sync over a time of period.
  - An Observable will continously observe a set of system data & automatically update or track that sequence of data whenever there is someting changed.
  - Example
    - import Observable
      ```
      import { Observable } from 'rxjs';
      ```
    - Implements OnInit ให้กับ class
      ```
      export class AppComponent implements OnInit
      ```
    - เขียน Method ngOnInit() และทำการเรียกใช้งาน Observer จะเห็นว่าไม่มีอะไรเกิดขึ้น
      ```
      const obsTest$ = new Observable(observer => {
        console.log("Print from Observer");
      })
      ```
    - เรียกใช้งาน Method subscribe()
      ```
      const obsTest$ = new Observable(observer => {
        console.log("Print from Observer");
      }).subscribe();
      ```
    - การทำงานของ Method subscribe จะเหมือนกับการเรียกใช้งานฟังก์ชั่นแบบทั่วไปเลย
      ```
      const obsTest = function(){
        console.log("Print from function");
      }
      obsTest()
      ```
    - Observer next
      - เหมือนกับการ Return ค่าของ JavaScript
        - เรียกใช้ observer.next
          ```
          observer.next("Print from Observer")
          ```
        - ใน subscribe ให้เขียน function เพื่อนำค่ามาจัดการ
          ```
          .subscribe(value => {
            console.log(value);
          })
          ```
    - RXJS Observable vs JavaScript functions
      - RXJS Observable สามารถ return ได้หลายครั้ง
    - Sync vs Async
    - Subscriber vs unsubscriber
# How to get Router parameters & Query Parameters?
  - Router Parameters.
  - Query parameter
    - ใช้ [queryParams] โดยค่าข้างในส่งไปในรูปแบบของ Key value
      ```
      [queryParams]="{ page: 1, orderBy: 'newest'}"
      ```
    - ใน Component
      - implements Oninit
      - Inject private route: ActivatedRoute
      - นำค่า Query params มาใช้โดย Method queryParamMap.subscribe
        ```
        this.route.queryParamMap.subscribe(value => {
          console.log(value);
          const page = value.get('page');
          const orderBy = value.get('orderBy')
          console.log(page, orderBy);
        })
        ```
  - Separate file for angular routing (Clean code)
    - Generate file module ขึ้นมาใหม่ 
      ```
      ng g module app-routing --module app --flat
      ```
    - ลบ CommonModule และ declarations ออกเพราะมำจำเป็นต้องใช้
    - import RouterModule และเรียกใช้งานใน exports
      ```
      import { RouterModule } from '@angular/router';
      @NgModule({
        imports: [],
        exports: [RouterModule]
      })
      ```
    - สร้างตัวแปรมี type เป็น Routes มาเพื่อเก็บ Route ต่างๆ
      ```
      const routes: Routes = [
        { path: '', component: HomeComponent },
        { path: 'posts', component: PostListComponent },
        { path: 'post/:id/:title', component: SinglePostComponent }
      ]
      ```
    - ใน imports เรียกใช้งาน Method forRoot ของ RouterModule และส่งค่า routers ที่เรากำหนดไว้เข้าไปด้วย
      ```
      imports: [
        RouterModule.forRoot(routes)
      ],
      ```
    - ลบ Route ที่เราเขียนไว้ใน app.module ออกแล้วลองรัน
# How to navigate routers programmatically?
  - การเขียนเป็นฟังก์ชั่นใน Component สามารถใช้งาน Routing params ได้ทุกแบบ
    - เขียนปุ่มสำหรับ เรียกใช้ Method function
      ```
      <button (click)="submit()"></button>
      ```
    - Inject private router ใน constructor
      ```
      constructor(private router: Router)
      ```
    - แบบ Navigate
      ```
      submit() {
        this.router.navigate(['/posts']);
      }
      ```
    - ส่งค่า Parameter
      ```
      submit() {
        this.router.navigate(['/post', 1, 'postTitle']);
      }
      ```
    - ส่งค่า query params
      ```
      submit() {
        this.router.navigate(['/posts'], {  queryParams: {page: 1, order: 'newest'} });
      }
      ```
  - Wild card
    - Create component ใหม่
      ```
      ng g c fornotfound
      ```
    - เขียนใน routing เมื่อไม่มี path ที่กำหนดให้ Redirect ไปแสดงหน้า fornotfound
      ```
      { path: '**', component: FornotfoundComponent }
      ```
