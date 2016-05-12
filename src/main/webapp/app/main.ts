import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {FORM_PROVIDERS} from "@angular/common";
import {provide} from "@angular/core";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {ApplicationComponent} from "./components/application.component";
import {TRANSLATE_PROVIDERS, TranslateLoader, TranslateStaticLoader, TranslateService} from "ng2-translate";
import {enableProdMode} from "@angular/core";
enableProdMode();

bootstrap(ApplicationComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    TRANSLATE_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                noTokenScheme: true
            }), http);
        },
        deps: [Http]
    }),
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, "app/locale", ".json"),
        deps: [Http]
    }),
    TranslateService
]);
