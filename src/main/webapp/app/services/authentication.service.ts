import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) {
    }

    authenticate(username: string, password: string) {
        let user: any = {
            username: username,
            password: password
        };

        console.log(this._http.post("/authentication/login/process", user));
       this._http.post("/authentication/login/process", user)
           .subscribe();
    }
}