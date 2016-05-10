import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {TranslatePipe, TranslateService} from "ng2-translate";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./auth/login/login-form.component";
import {RegisterComponent} from "./auth/register/register-form.component";
import {AuthenticationService} from "../services/authentication.service";
import {isAuthenticated} from "../services/is-authenticated";
import {UserHomeComponent} from "./userHome/user-home.component";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthenticationService],
    pipes: [TranslatePipe]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent, useAsDefault: true},
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/register", name: "Register", component: RegisterComponent},
    {path: "/my", name: "Home", component: UserHomeComponent}
])
export class ApplicationComponent {
    // TODO: ng2-translate for angular 2 rc
    constructor(private _authenticationService: AuthenticationService,
                private _router: Router,
                private _translateService: TranslateService) {
        // use navigator lang if available
        let userLang = navigator.language.split("-")[0];
        userLang = /(pl|en)/gi.test(userLang) ? userLang : "en";

        // this language will be used as a fallback when a translation isn't found in the current language
        _translateService.setDefaultLang("en");

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        _translateService.use(userLang);

        console.log(_translateService.currentLang);
    }

    changeLanguate(language: string) {
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
