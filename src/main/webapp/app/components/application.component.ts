import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {TranslatePipe, TranslateService} from "ng2-translate";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent, useAsDefault: true},
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/register", name: "Register", component: RegisterComponent}

])
export class ApplicationComponent {
    constructor(private translate: TranslateService) {
        this.translate = translate;
        let userLang = navigator.language.split("-")[0]; // use navigator lang if available
        userLang = /(pl|en)/gi.test(userLang) ? userLang : "en";

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang("en");

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }

    changeLanguate(language: string) {
        this.translate.use(language);
    }
}
