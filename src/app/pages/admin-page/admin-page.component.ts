import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  userList: User[] = [];

  constructor(private userService: UserService) {
    this.userList = this.userService.getUsers();
  }


}
