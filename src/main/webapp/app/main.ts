import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {provide} from "@angular/core";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {ApplicationComponent} from "./components/application.component";

bootstrap(ApplicationComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                noTokenScheme: true
            }), http);
        },
        deps: [Http]
    })
]);

// TODO: ng2-translate for angular 2 rc
// bootstrap(ApplicationComponent,
//     [ROUTER_PROVIDERS, HTTP_PROVIDERS, TRANSLATE_PROVIDERS,
//         provide(TranslateLoader, {
//             useFactory: (http: Http) => new TranslateStaticLoader(http, "app/locale", ".json"),
//             deps: [Http]
//         })
//     ]);
