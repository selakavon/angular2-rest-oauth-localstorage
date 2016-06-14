import {Component, ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router} from '@angular/router';

import {Location} from '@angular/common';

import {NavigationComponent} from './navigation/navigation.component';

import {TimeEntriesViewComponent} from './time-entries/time-entries-view.component';
import {TimeEntryEditComponent} from './time-entries/time-entry-edit.component';

import {UserAdminComponent} from './admin/user-admin.component';
import {UserEditComponent} from './admin/user-edit.component';

import {ReportWeeklyComponent} from './report/report-weekly.component';

import {UserLoginComponent} from './user/user-login.component';
import {UserRegisterComponent} from './user/user-register.component';

import {TimeEntryService} from '../service/time-entry.service';
import {FormatterService} from '../service/formatter.service';
import {ReportWeeklyService} from '../service/report-weekly.service';
import {UserService} from '../service/user.service';
import {LoginService} from '../service/login.service';
import {AuthHttpService} from '../service/auth-http.service';
import {LocalStorageService} from '../service/local-storage.service';
import {URLParserService} from '../service/url-parser.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/component/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
		NavigationComponent
	],
    providers: [
        ROUTER_PROVIDERS,
    	HTTP_PROVIDERS,
        TimeEntryService,
        FormatterService,
        ReportWeeklyService,
        UserService,
        LoginService,
        AuthHttpService,
        LocalStorageService,
        URLParserService
    ],
})
@Routes([ 
    { path: '', component: TimeEntriesViewComponent },
    { path: '/time-entries', component: TimeEntriesViewComponent },
    { path: '/time-entries/:entriesHref/:name', component: TimeEntriesViewComponent },
    { path: '/time-entry-edit', component: TimeEntryEditComponent },
    { path: '/time-entry-edit/:href', component: TimeEntryEditComponent },
    { path: '/time-entry-edit/:entriesHref', component: TimeEntryEditComponent },
    { path: '/report-weekly', component: ReportWeeklyComponent },
    { path: '/user-admin', component: UserAdminComponent },
    { path: '/user-edit/:href', component: UserEditComponent },
    { path: '/user-edit', component: UserEditComponent },
    { path: '/login', component: UserLoginComponent},
    { path: '/register', component: UserRegisterComponent}
])
export class AppComponent {

    private publicPages = ['/login', '/register'];  
    
    private restrictedPages = [
        {
            page: '/user-admin',
            role: 'ADMIN'
        }
    ];

    constructor(
		private _location: Location,
		private _loginService: LoginService,
        private _router: Router,
        location: Location) {
            
        this._router.changes.subscribe(() => {
            this.checkAuthorization();
        });
            
    }
    
    checkAuthorization() {
        if (this.publicPages.indexOf(this._location.path()) === -1 && !this._loginService.authenticated()) {
            this._router.navigate(['/login']);
        }

        if (this._loginService.authenticated() && this._location.path() === '/login') {
            this._router.navigate(['']);
        }
        
        let role = this.requiredRole();
        
        
        if (role && !this._loginService.hasRole(role)) {
            this._router.navigate(['']);    
        }
    }
    
    requiredRole() {
        let pageRole = this.restrictedPages.find(
            (value) => this._location.path().startsWith(value.page)
        );
        
        if (pageRole) {
            return pageRole.role;
        } else {
            return null;
        }
    }

 }
    
    
    
    