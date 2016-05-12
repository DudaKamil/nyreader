import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {TranslatePipe, TranslateService} from "ng2-translate";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./auth/login/login-form.component";
import {RegisterComponent} from "./auth/register/register-form.component";
import {AuthenticationService} from "../services/authentication.service";
import {isAuthenticated} from "../services/is-authenticated";
import {UserHomeComponent} from "./userHome/user-home.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AccountComponent} from "./account/account.component";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES, SidebarComponent],
    providers: [AuthenticationService],
    pipes: [TranslatePipe]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent, useAsDefault: true},
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/register", name: "Register", component: RegisterComponent},
    {path: "/account", name: "Account", component: AccountComponent},
    {path: "/my", name: "Home", component: UserHomeComponent}
])
export class ApplicationComponent {
    constructor(private _authenticationService: AuthenticationService,
                private _router: Router,
                private _translateService: TranslateService) {
        let userLang = navigator.language.split("-")[0];
        userLang = /(pl|en)/gi.test(userLang) ? userLang : "en";

        this._translateService.setDefaultLang("en");

        this._translateService.use(userLang);
    }

    changeLanguage(language: string) {
        this._translateService.use(language);
    }

    logout(): void {
        this._authenticationService.logout();
        this._router.navigate(["Welcome"]);
    }

    isLoggedin() {
        return isAuthenticated();
    }
}
