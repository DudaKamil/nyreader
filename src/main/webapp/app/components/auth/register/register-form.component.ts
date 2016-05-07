import {Component} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../common/user";

@Component({
    templateUrl: "app/components/auth/register/register-form.component.html",
    styleUrls: ["app/components/auth/register/register-form.component.css"],
    providers: [AuthenticationService]
})
export class RegisterComponent {
    private _submitted: boolean;
    public model: User;
    public active: boolean;
    public msg: any;
    public error: any;

    constructor(private _authenticationService: AuthenticationService) {
        this._submitted = false;
        this.active = true;
        this.model = new User("", "");
    }

    onSubmit() {
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        setTimeout(() => this.active = true, 0);

        this._submitted = true;
        this.model = new User("", "");
        this.active = false;
    }
}
