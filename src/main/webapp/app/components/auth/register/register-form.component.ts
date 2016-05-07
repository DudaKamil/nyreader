import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../common/user";
import {ValidationService} from "../../../services/validation.service";

@Component({
    templateUrl: "app/components/auth/register/register-form.component.html",
    styleUrls: ["app/components/auth/register/register-form.component.css"],
    providers: [AuthenticationService]
})
export class RegisterComponent {
    public model: User;
    public active: boolean;
    public msg: any;
    public error: any;
    public registerForm: any;

    constructor(private _authenticationService: AuthenticationService,
                private _formBuilder: FormBuilder) {
        this.registerForm = _formBuilder.group({
            username: ["", Validators.compose([Validators.required, ValidationService.emailValidator])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.active = true;
        this.model = new User("", "");
    }

    onSubmit() {
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        setTimeout(() => this.active = true, 0);

        this.model = new User("", "");
        this.active = false;
    }
}
