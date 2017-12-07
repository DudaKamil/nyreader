# NyReader
[![Build Status](https://travis-ci.org/kamilduda/nyreader.svg?branch=master)](https://travis-ci.org/kamilduda/nyreader)

## About
RSS feeds reader web application.

Created using Angular 2, Java Spring and MongoDB.

### Application dashboard
![demo](/git_images/dash.png)

## Build and run
Requires a running MongoDB database (default port: 27017).

1. `./gradlew build`
2. `./gradlew bootRun` or `java -jar build/libs/nyreader-1.0.0.jar`

## Front-end development
* `gulp watch` or `./gradlew gulp_watch_`
    - watch html, ts, sass, json files in `src/main/webapp/` for changes
    - changes will be copied into `src/main/resources/static/`
* run `npm rebuild node-sass` if gulp does not work

## License
[GNU General Public License v3.0](/LICENSE.md)
