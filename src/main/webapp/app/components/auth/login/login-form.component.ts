import {Component} from "@angular/core";
import {Validators, FormBuilder} from "@angular/common";
import {Router} from "@angular/router-deprecated";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../common/user";
import {ValidationService} from "../../../services/validation.service";

@Component({
    templateUrl: "app/components/auth/login/login-form.component.html",
    styleUrls: ["app/components/auth/login/login-form.component.css"],
    providers: [AuthenticationService]
})
export class LoginComponent {
    public model: User;
    public active: boolean;
    public msg: any;
    public error: any;
    public loginForm: any;

    constructor(private _authenticationService: AuthenticationService,
                private _formBuilder: FormBuilder,
                private _router: Router) {
        this.loginForm = _formBuilder.group({
            username: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
            password: ["", Validators.required]
        });

        this.active = true;
        // TODO: debug - remove credentials
        this.model = new User("user@example.com", "user");
    }

    onSubmit() {
        this._authenticationService.authenticate(this.model)
            .subscribe(
                msg => {
                    this._router.navigate(["Welcome"]);
                    this.model = new User("", "");
                    this.error = "";
                },
                error => {
                    this.model.password = "";

                    // Reset the form with a new hero AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = false;
                    setTimeout(() => this.active = true, 0);

                    this.error = "Username or password does not match!";
                }
            );
    }
}
