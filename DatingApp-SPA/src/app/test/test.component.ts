import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  text = 'Hello Mohon';
  @ViewChild('f', { static: true }) signUpFrom: NgForm;
  constructor() { }

  ngOnInit() {
  }
  submitData() {
    this.text = 'Hello Mohon Appended';
  }

  onSubmit() {
    console.log(this.signUpFrom);

  }

}
