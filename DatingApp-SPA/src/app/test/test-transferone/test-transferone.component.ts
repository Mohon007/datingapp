import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-test-transferone',
  templateUrl: './test-transferone.component.html',
  styleUrls: ['./test-transferone.component.css']
})
export class TestTransferoneComponent implements OnInit, OnChanges {
  @Input() getText: string;
  constructor(private testService: TestService, private alertify: AlertifyService) {
    this.testService.statusUpdate.subscribe(data => {
      this.alertify.success(data);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getText = <string>changes.getText.currentValue;
    this.alertify.success(this.getText);
  }

  ngOnInit() {
    console.log(this.getText);
  }


}
