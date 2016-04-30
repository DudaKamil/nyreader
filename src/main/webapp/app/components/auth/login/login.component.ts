import {Component} from "angular2/core";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    templateUrl: "app/components/auth/login/login.component.html",
    styleUrls: ["app/components/auth/login/login.component.css"],
    providers: [AuthenticationService]
})
export class LoginComponent {
    private _loginForm: any;

    // TODO: login form

    constructor(private _authenticationService: AuthenticationService) {

    }


    onSubmit(event: any) {
    }
}
