import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { FriendsService } from '../../../services/classes/friends/friends.service';
import { AppConstants} from '../../../constants';

@Component({
  selector: 'app-friends-info',
  templateUrl: './friends-info.component.html',
  styleUrls: ['./friends-info.component.scss']
})
export class FriendsInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
