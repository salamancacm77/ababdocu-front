import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { FriendsService } from '../../../services/classes/friends/friends.service';
import { AppConstants} from '../../../constants';
import { FriendFields } from './friends-info.component';

@Component({
  selector: 'app-friends-info',
  templateUrl: './friends-info.component.html',
  styleUrls: ['./friends-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FriendsInfoComponent {

  className: any = AppConstants.className;
  friends: any;
  durationWarning = 5;
  warningMessage = 'Ocurrió un error obteniendo los datos del servicio';
  displayedColumns = [
    'FRIEND',
    'MODELED_ONLY',
    'DESCRIPTION',
    'FRIENDTYPE',
    'VERSION',
    'AUTHOR',
    'CREATED_ON',
    'CHANGED_BY',
    'CHANGED_ON'
  ];
  panelOpenState = false;

  constructor(
    private friendsService: FriendsService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
      this.getClassFriends();
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationWarning * 1000,
    });
  }

  getClassFriends() {

    this.spinner.show();

    this.friendsService.getClassFriends(this.className).subscribe( result => {
      this.friends = result.FRIENDSHIPS;
      this.spinner.hide();
      console.log(result);
    },
      error => {
        this.showSnackBar(`${this.warningMessage}: getClassFriends`);
        console.log(`Error: getClassEvents() -->  ${JSON.stringify(error)}`);
        this.spinner.hide();
      });
  }

}

export interface FriendFields {
  FRIEND: string;
  MODELED_ONLY: string;
  DESCRIPTION: string;
  FRIENDTYPE: string;
  VERSION: string;
  AUTHOR: string;
  CREATED_ON: string;
  CHANGED_BY: string;
  CHANGED_ON: string;
}
