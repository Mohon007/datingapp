import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  statusUpdate = new EventEmitter<string>();
  status: string;
  constructor() { }

}
