import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {isAuthenticated} from "../../services/is-authenticated";
import {TranslateService, TranslatePipe} from "ng2-translate";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: "sidebar",
    templateUrl: "app/components/sidebar/sidebar.component.html",
    styleUrls: ["app/components/sidebar/sidebar.component.css"],
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class SidebarComponent {
    constructor(private _authenticationService: AuthenticationService,
                private _router: Router,
                private _translateService: TranslateService) {
    }

    changeLanguage(language: string) {
        this._translateService.use(language);
    }

    isLoggedin() {
        return isAuthenticated();
    }

    logout(): void {
        this._authenticationService.logout();
        this._router.navigate(["Welcome"]);
    }
}