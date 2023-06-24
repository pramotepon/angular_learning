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
        - String interpolation
          
    - Angular Two-Way Data Binding
    - How to Handle Events in Angular
      - click
      - keyup
      - filtering
