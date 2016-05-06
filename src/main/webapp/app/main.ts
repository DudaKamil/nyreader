import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {provide} from "@angular/core";
import {TRANSLATE_PROVIDERS, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {ApplicationComponent} from "./components/application.component";

bootstrap(ApplicationComponent,
    [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

// TODO: ng2-translate for angular 2 rc
// bootstrap(ApplicationComponent,
//     [ROUTER_PROVIDERS, HTTP_PROVIDERS, TRANSLATE_PROVIDERS,
//         provide(TranslateLoader, {
//             useFactory: (http: Http) => new TranslateStaticLoader(http, "app/locale", ".json"),
//             deps: [Http]
//         })
//     ]);