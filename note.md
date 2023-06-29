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
          - With the learning * Symbol we can Easily Identify a Structural Directive
        1. Responsible for the HTML Layout.
        2. Shape or Reshape the DOM Structure by adding and removing HTML Element.
        3. Can Identyfy With leading * Symbol
        4. Structural Directive - 
          *ngFor
          *ngIf
          *ngSwitchCase
      - Attribute Directive คืออะไร?
        - With The Attribute Directive we can only change the Appearance of the DOM (Document Object Model)
        1. Change the Appearance or the behavior of a DOM Element
        2. Attribute Directive - 
          ngStyle
          ngClass

9. Angular PIPES
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
