import { Injectable       } from '@angular/core';
import { Http, Headers    } from '@angular/http';
import { tokenNotExpired  } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken : any;
    user      : any;

    constructor(private http:Http) { }

    /*
    Look at the users.js in the routes directory. We make the POST request to register
    It then takes all the form fields and maps it to the newUser object, which is then
    ran through the addUser()
    */
    registerUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
            return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
            .map(response => response.json());
    }

    authenticateUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
        .map(response => response.json());
    }

    getProfile() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/profile', {headers: headers})
        .map(response => response.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken  = token;
        this.user       = user;
        console.log('asdfasfasfasdfasdfasdfasd' + this.user);
    }

    loadToken() { //fetched from local sotrage
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    isAdmin(user) {
        return user.access === 'admin';
    }
}
