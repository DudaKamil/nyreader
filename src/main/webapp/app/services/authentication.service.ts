import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {User} from "../common/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {
    private _loginEndpoint: string = "/auth/login";

    constructor(private _http: Http) {
    }

    authenticate(user: User): Observable<Response> {
        let userData: string = JSON.stringify(user);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "dataType": "json"
        });
        let options = new RequestOptions({headers: headers});

        // TODO: map method does not work
        let response: Observable<Response> = this._http.post(this._loginEndpoint, userData, options);

        response.subscribe(
            res => {
                let token: string = res.json().token;
                localStorage.setItem("TOKEN", token);
            }
        );

        return response;
    }
}