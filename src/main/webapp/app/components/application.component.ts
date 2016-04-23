import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {WelcomeComponent} from "./welcome/welcome.component";

@Component({
    selector: "application",
    templateUrl: "app/components/application.component.html",
    styleUrls: ["app/components/application.component.css"],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: "/welcome", name: "Welcome", component: WelcomeComponent},
    {path: "/**", redirectTo: ["Welcome"]}
])
export class ApplicationComponent {
}
