import {Component} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";
import {isAuthenticated} from "../../services/is-authenticated";
import {TranslatePipe} from "ng2-translate";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../services/authentication.service";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Validators} from "@angular/common";
import {FormBuilder} from "@angular/common";

@Component({
    templateUrl: "app/components/account/account.component.html",
    styleUrls: ["app/components/account/account.component.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthenticationService, Title],
    pipes: [TranslatePipe]
})
@CanActivate(() => isAuthenticated())
export class AccountComponent {
    public accountName: string;
    public model;
    public passwordForm: any;
    public passwordError: string;
    public active: boolean = true;
    public isSuccess: boolean = false;
    public isError: boolean = false;

    constructor(private _authenticationService: AuthenticationService,
                private _title: Title,
                private _formBuilder: FormBuilder) {
        this._title.setTitle("NyReader - RSS Reader - My account");

        this.passwordForm = _formBuilder.group({
                currentPassword: ["", Validators.required],
                newPassword: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
                confirm_password: ["", Validators.required],
            }
        );

        this.accountName = localStorage.getItem("user");

        this.clearModel();
    }

    onSubmit() {
        this.isSuccess = false;
        this.isError = false;

        let model = {
            currentPassword: this.model.currentPassword,
            newPassword: this.model.newPassword
        };

        this._authenticationService.changePassword(model)
            .subscribe(
                msg => {
                    this.isSuccess = true;
                },
                err => {
                    this.isError = true;
                }
            );

        this.clearModel();

        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    onKeyup(value) {
        if (value.localeCompare(this.model.newPassword) != "0") {
            this.passwordError = "Passwords does not match!";

        } else {
            this.passwordError = null;
        }
    }

    dismissInfo() {
        this.isSuccess = false;
    }

    dismissError() {
        this.isError = false;
    }

    private clearModel() {
        this.model = {
            currentPassword: "",
            newPassword: "",
            passwordRepeat: ""
        };
    }
}