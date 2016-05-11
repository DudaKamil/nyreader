import {Component, OnInit} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";
import {isAuthenticated} from "../../services/is-authenticated";
import {FeedService} from "../../services/feed.service";
import {Feed} from "../../common/feed";
import {TranslatePipe} from "ng2-translate";
import {Title} from "@angular/platform-browser";

@Component({
    templateUrl: "app/components/userHome/user-home.component.html",
    styleUrls: ["app/components/userHome/user-home.component.css"],
    providers: [FeedService, Title],
    pipes: [TranslatePipe]
})
@CanActivate(() => isAuthenticated())
export class UserHomeComponent implements OnInit {
    constructor(private _feedService: FeedService,
                private _title: Title) {
        this._title.setTitle("NyReader - RSS Reader - Homepage");
    }

    ngOnInit(): any {
        this.getAllFeeds();
    }

    public feeds: Feed[] = [];
    public newUrl: string = "";
    public active: boolean = true;
    public currentFeed: Feed = null;
    public feedAlreadyExists: boolean = false;
    public feedProcessingError: boolean = false;

    onSubmit() {
        let newFeed: Feed = new Feed();
        newFeed.url = this.newUrl;

        this._feedService.postNewUrl(this.newUrl)
            .subscribe(
                res => {
                    this.getAllFeeds();
                    this.feedProcessingError = false;
                    this.feedAlreadyExists = false;
                },
                error => {
                    let msg: string = error._body;
                    if (msg == "error") {
                        this.feedProcessingError = true;
                    }
                    if (msg == "exists") {
                        this.feedAlreadyExists = true;
                    }
                }
            );

        this.newUrl = "";
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    deleteFeed(feed: string) {
        this._feedService.deleteFeed(feed)
            .subscribe(
                res => this.getAllFeeds()
            );
    }

    displayFeed(feed: Feed) {
        this.currentFeed = feed;
        // TODO: debug
        console.log(feed);
    }

    redirectTo(link: string, event: any) {
        window.open(link);
        event.preventDefault();
    }

    private getAllFeeds() {
        console.log("getAllFeeds()");
        this._feedService.getUserFeeds()
            .subscribe(
                res => {
                    try {
                        let json = res.json();
                        if (json !== "") {
                            this.feeds = json;
                        } else {
                            console.log("empty");
                        }
                        // TODO: debug
                        console.log(json);
                    } catch (error) {
                    }
                }
            );
    }
}