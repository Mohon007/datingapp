import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private userService: UserService
    , private authService: AuthService
    , private route: ActivatedRoute
    , private alertify: AlertifyService
  ) {


  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
  loadMessages() {

    this.userService.getMessages(this.authService.decodeToken.nameid
      , this.pagination.currentPage
      , this.pagination.itemsPerPage
      , this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  pageChanged(event: any): void {
    console.log('Event', event);
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  deleteMessage(id: number) {
    this.alertify.confirm('Are You Sure you Want to Delete this Message', () => {
      this.userService.deleteMessage(id, this.authService.decodeToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message Have been Deleted');
      }, error => {
        this.alertify.error('Failed to delete message')
      });
    });
  }

}
