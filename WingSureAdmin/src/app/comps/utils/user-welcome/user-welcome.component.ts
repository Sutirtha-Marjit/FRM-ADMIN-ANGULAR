import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.less']
})
export class UserWelcomeComponent implements OnInit {

  @Output() whenSignOut = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  signout(){
    this.whenSignOut.emit({});
  }

}
