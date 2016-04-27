import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {TranslatePipe} from "ng2-translate";

@Component({
    templateUrl: "app/components/welcome/welcome.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})
export class WelcomeComponent {
}