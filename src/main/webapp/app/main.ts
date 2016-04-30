import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {ApplicationComponent} from "./components/application.component";
import {provide} from "angular2/core";
import {TRANSLATE_PROVIDERS, TranslateLoader, TranslateStaticLoader} from "ng2-translate";

bootstrap(ApplicationComponent,
    [ROUTER_PROVIDERS, HTTP_PROVIDERS, TRANSLATE_PROVIDERS,
        provide(TranslateLoader, {
            useFactory: (http: Http) => new TranslateStaticLoader(http, "app/locale", ".json"),
            deps: [Http]
        })
    ]);

