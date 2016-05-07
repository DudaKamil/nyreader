import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {TranslatePipe, TranslateService} from "ng2-translate";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./auth/login/login-form.component";
import {RegisterComponent} from "./auth/register/register-form.component";
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthenticationService],
    pipes: []
    // pipes: [TranslatePipe]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent, useAsDefault: true},
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/register", name: "Register", component: RegisterComponent},
    {path: "/**", redirectTo: ["Welcome"]}
])
export class ApplicationComponent {
    public isAuthenticated: boolean;

    constructor(private _authenticationService: AuthenticationService) {
        this.isAuthenticated = _authenticationService.isAuthenticated;
    }

    // TODO: ng2-translate for angular 2 rc
    // constructor(private translate: TranslateService) {
    //     this.translate = translate;
    //     let userLang = navigator.language.split("-")[0]; // use navigator lang if available
    //     userLang = /(pl|en)/gi.test(userLang) ? userLang : "en";
    //
    //     // this language will be used as a fallback when a translation isn't found in the current language
    //     translate.setDefaultLang("en");
    //
    //     // the lang to use, if the lang isn't available, it will use the current loader to get them
    //     translate.use(userLang);
    // }
    //
    // changeLanguate(language: string) {
    //     this.translate.use(language);
    // }

    logout() {
        this._authenticationService.logout();
    }
}
