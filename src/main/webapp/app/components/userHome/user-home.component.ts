import {Component, OnInit} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";
import {isAuthenticated} from "../../services/is-authenticated";
import {FeedService} from "../../services/feed.service";
import {Feed} from "../../common/feed";

@Component({
    templateUrl: "app/components/userHome/user-home.component.html",
    styleUrls: ["app/components/userHome/user-home.component.css"],
    providers: [FeedService]
})
@CanActivate(() => isAuthenticated())
export class UserHomeComponent implements OnInit {
    constructor(private _feedService: FeedService) {
    }

    ngOnInit(): any {
        this.getAllFeeds();
    }

    public feeds: Feed[] = [];
    public newUrl: string = "";
    public active: boolean = true;

    onSubmit() {
        let newFeed: Feed = new Feed();
        newFeed.url = this.newUrl;

        this._feedService.postNewUrl(this.newUrl)
            .subscribe(
                res => this.getAllFeeds()
            );

        this.newUrl = "";
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    private getAllFeeds() {
        this._feedService.getUserFeeds()
            .subscribe(
                res => {
                    try {
                        this.feeds = res.json();
                    } catch (error) {
                    }
                }
            );
    }
}