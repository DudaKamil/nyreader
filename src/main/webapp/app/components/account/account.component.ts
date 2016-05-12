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
        let model = {
            currentPassword: this.model.currentPassword,
            newPassword: this.model.newPassword
        };

        this._authenticationService.changePassword(model)
            .subscribe(
                msg => {
                    msg = msg.json();
                    console.log(msg);
                },
                err => {
                    console.log(err);
                }
            );

        this.clearModel();
    }

    onKeyup(value) {
        console.log(value);
        console.log(this.model.newPassword);
        if (value.localeCompare(this.model.newPassword) != "0") {
            this.passwordError = "Passwords does not match!";

        } else {
            this.passwordError = null;
        }
    }

    private clearModel() {
        this.model = {
            currentPassword: "",
            newPassword: "",
            passwordRepeat: ""
        };
    }
}