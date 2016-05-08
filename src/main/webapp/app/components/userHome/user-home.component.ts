import {Component} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";
import {isAuthenticated} from "../../services/is-authenticated";

@Component({
    templateUrl: "app/components/userHome/user-home.component.html",
    styleUrls: ["app/components/userHome/user-home.component.css"]
})
@CanActivate(() => isAuthenticated())
export class UserHomeComponent {
    public feeds: string[] = [];
    public newFeed: string = "";
    public active: boolean = true;

    constructor() {
    }

    onSubmit() {
        this.feeds.push(this.newFeed);
        this.newFeed = "";

        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}