import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-test-transfertwo',
  templateUrl: './test-transfertwo.component.html',
  styleUrls: ['./test-transfertwo.component.css']
})
export class TestTransfertwoComponent implements OnInit {
  text: string;
  constructor(private testService: TestService) {
    this.testService.statusUpdate.emit('TestTwo');
  }

  ngOnInit() {
  }
  submiteData() {
    this.text = 'Hello Mohon';
  }

}
