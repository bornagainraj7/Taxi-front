import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  private authListSubs: Subscription;
  public isAuthenticated = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuth();
    this.authListSubs = this.userService.getAuthStatusListener()
    .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authListSubs.unsubscribe();
  }

}
