import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthService } from '../../@core/auth/auth.service';
import { UserService } from '../../@core/user/user.service';
import { User } from '../../@core/user/user.model';


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService) { }

  private users : User[];
  private isAdmin = this.authService.isAdmin();
  settings : any;
  


  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      		this.users = result;
      });

      if(this.isAdmin) {
        this.settings = {
          add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
          },
          delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
          },
          columns: {
            firstName: {
              title: 'First Name'
            },
            lastName: {
              title: 'Last Name'
            },
            rank: {
              title: 'Rank'
            },
            flight: {
              title: 'Flight'
            },
            team: {
              title: 'Team'
            },
            phone: {
              title: 'Phone'
            },
            email: {
              title: 'Email'
            },
            role: {
              title: 'Role'
            },
          }
        };
      } else {
        this.settings = {
          actions: {
            add: false,
            edit: false,
            delete: false
          },
          add: {
            addButtonContent: '<i class="nb-plus" disabled></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
          },
          columns: {
            firstName: {
              title: 'First Name'
            },
            lastName: {
              title: 'Last Name'
            },
            rank: {
              title: 'Rank'
            },
            flight: {
              title: 'Flight'
            },
            team: {
              title: 'Team'
            },
            phone: {
              title: 'Phone'
            },
            email: {
              title: 'Email'
            },
          }
        };
      }
  }

  private onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      console.log(event.newData);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
