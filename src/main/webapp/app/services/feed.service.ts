import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Rx";
import {Response} from "@angular/http";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class FeedService {
    private _feedsEndpoint: string = "/feed";
    private _options: RequestOptions;

    constructor(private _authHttp: AuthHttp) {
        let headers: Headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "dataType": "json"
        });
        this._options = new RequestOptions({headers: headers});
    }

    getUserFeeds(): Observable<Response> {
        return this._authHttp.get(this._feedsEndpoint);
    }

    postNewUrl(newUrl: string) {
        return this._authHttp.post(this._feedsEndpoint, newUrl, this._options);
    }

    deleteFeed(feed: string) {
        return this._authHttp.post(this._feedsEndpoint + "/delete", feed, this._options);
    }
}