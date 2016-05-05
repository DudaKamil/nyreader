import {Component} from "angular2/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../common/user";

@Component({
    templateUrl: "app/components/auth/login/login-form.component.html",
    styleUrls: ["app/components/auth/login/login-form.component.css"],
    providers: [AuthenticationService]
})
export class LoginComponent {
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

        this._authenticationService.authenticate(this.model)
            .subscribe(
                msg => {
                    this.msg = msg;
                    console.log("MSG:");
                    console.log(this.msg);
                },
                error => {
                    this.error = <any>error;
                    console.log("ERROR:");
                    console.log(this.error);
                }
            );

        this._submitted = true;
        this.model = new User("", "");
        this.active = false;
    }

}
