import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {LoginService} from '../../service/login.service';

import {User} from '../../type/user';

@Component({
    selector: 'navigation',
    templateUrl: './app/component/navigation/navigation.component.html',
    directives: [
		ROUTER_DIRECTIVES
    ]
})
export class NavigationComponent {

	constructor(
    private _router: Router,
    private _loginService: LoginService) {
	}
  
  get user(): User {
    return this._loginService.user;
  }
  
  get authenticated(): boolean {
    return this._loginService.authenticated();
  }
  
  get adminRole(): boolean {
    return this._loginService.hasRole('ADMIN');
  }
  
  logout() {
		this._loginService.logout(
			() => this._router.navigate([''])
		);
	}

}