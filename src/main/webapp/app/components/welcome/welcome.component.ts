import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {TranslatePipe} from "ng2-translate";

@Component({
    templateUrl: "app/components/welcome/welcome.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: []
    // pipes: [TranslatePipe]
})
export class WelcomeComponent {
}