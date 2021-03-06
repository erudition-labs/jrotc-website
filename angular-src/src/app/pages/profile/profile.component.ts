import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/user/user.service';
import { User } from '../../@core/user/user.model';

import { AuthService } from '../../@core/auth/auth.service';


@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService) { }

	public user : User;


  ngOnInit() {
		this.userService.getUser(this.authService.parseToken().sub).subscribe((result) => {
				this.user = result;
		});
	}

}
