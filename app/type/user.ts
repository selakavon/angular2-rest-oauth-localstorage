import {UserLinks} from './links';

export class User {
	fullName: string;
	userName: string;
	password: string;
	roles: string[];

	_links: UserLinks;
}