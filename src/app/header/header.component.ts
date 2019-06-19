import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authServide: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authServide.getIsAuth();
    this.authListenerSubs = this.authServide.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  // clear the token
  onLogout() {
    this.authServide.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
