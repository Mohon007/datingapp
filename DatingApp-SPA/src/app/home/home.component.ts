import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
/** home component*/
export class HomeComponent implements OnInit {
    ngOnInit(): void {
      this.getValues();
    }
  registerModel = false;
  values: any;
  /** home ctor */
  constructor(private http: HttpClient) {
  }
  registerToggle() {
    this.registerModel = true;
  }

  getValues() {
    this.http.get('http://localhost:5001/api/values/').subscribe(response => {
      this.values = response;
    },
      error => {
        console.log(error);
      }
    );
  }

  cancelRegisterModel(registerModel: boolean) {
    this.registerModel = registerModel;
  }
}
