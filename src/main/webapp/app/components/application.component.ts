import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {TranslatePipe, LocaleService, LocalizationService} from "angular2localization/angular2localization";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [LocaleService, LocalizationService],
    pipes: [TranslatePipe]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent},
    {path: "/**", redirectTo: ["Welcome"]}
])
export class ApplicationComponent {
    constructor(public locale: LocaleService, public localization: LocalizationService) {
        // TODO: check lang resources
        this.localization.translationProvider("../locale/locale-");
        this.locale.setCurrentLanguage("pl");
    }

    changeLanguage(lang: string) {
        this.locale.setCurrentLanguage(lang);
    }
}
