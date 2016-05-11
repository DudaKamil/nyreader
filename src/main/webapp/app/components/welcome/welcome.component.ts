import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {TranslatePipe} from "ng2-translate";
import {Title} from "@angular/platform-browser";

@Component({
    templateUrl: "app/components/welcome/welcome.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: [],
    providers: [Title]
    // pipes: [TranslatePipe]
})
export class WelcomeComponent {
    constructor(private _title: Title) {
        this._title.setTitle("NyReader - RSS Reader - Welcome");
    }
}