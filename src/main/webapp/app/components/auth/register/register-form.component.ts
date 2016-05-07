import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../common/user";
import {ValidationService} from "../../../services/validation.service";
import {CanActivate} from "@angular/router-deprecated";
import {isAuthenticated} from "../../../services/is-authenticated";
import {Router} from "@angular/router-deprecated";
import {Control, ControlGroup} from "@angular/common";

@Component({
    templateUrl: "app/components/auth/register/register-form.component.html",
    styleUrls: ["app/components/auth/register/register-form.component.css"],
    providers: [AuthenticationService]
})
@CanActivate(() => !isAuthenticated())
export class RegisterComponent {
    public model: User;
    public active: boolean;
    public msg: any;
    public error: any;
    public passwordError: string;
    public registerForm: any;

    constructor(private _authenticationService: AuthenticationService,
                private _formBuilder: FormBuilder,
                private _router: Router) {
        this.registerForm = _formBuilder.group({
                username: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
                password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
                confirm_password: ["", Validators.required],
            }
        );

        this.active = true;
        this.model = new User("", "");
    }

    onSubmit() {
        this._authenticationService.register(this.model)
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

                    this.error = "That user already exists!";
                }
            );
    }

    onKeyup(value) {
        if (value.localeCompare(this.model.password) != "0") {
            this.passwordError = "Passwords does not match!";

        } else {
            this.passwordError = null;
        }
    }
}
