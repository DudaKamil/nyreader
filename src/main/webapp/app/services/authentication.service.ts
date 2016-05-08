import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
import {User} from "../common/user";

@Injectable()
export class AuthenticationService {
    private _loginEndpoint: string = "/auth/login";
    private _registerEndpoint: string = "/auth/register";
    private _userEndpoint: string = "/user";
    public isAuthenticated: boolean = false;
    private _options: RequestOptions;


    constructor(private _http: Http, private _authHttp: AuthHttp) {
        let headers: Headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "dataType": "json"
        });
        this._options = new RequestOptions({headers: headers});
    }

    getUserData() {
        this._authHttp.get(this._userEndpoint)
            .subscribe(
                response => {
                    response = response.json();
                    this.saveUserData(response);
                }
            );
    }

    authenticate(user: User): Observable<Response> {
        let userData: string = JSON.stringify(user);

        let response: Observable<Response> = this._http.post(this._loginEndpoint, userData, this._options);

        response.subscribe(
            response => {
                let token: string = response.json().token;
                localStorage.setItem("id_token", token);
                this.isAuthenticated = true;
                this.getUserData();
            }
        );
        return response;
    }

    register(user: User): Observable<Response> {
        let userData: string = JSON.stringify(user);

        return this._http.post(this._registerEndpoint, userData, this._options);
    }

    logout() {
        this.removeUserData();
        this.isAuthenticated = false;
    }

    private saveUserData(userData: any) {
        let userID = userData.id;
        let user = userData.username;

        localStorage.setItem("userID", userID);
        localStorage.setItem("user", user);
    }

    private removeUserData() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("userID");
        localStorage.removeItem("user");
    }
}