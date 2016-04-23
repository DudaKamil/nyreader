"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json",
        {typescript: require("typescript")}),
    sourcemaps = require("gulp-sourcemaps"),
    del = require("del");

var paths = {
    workingDir: "./src/main/webapp/",
    staticResources: "./src/main/resources/static/",
    angularLibs: [
        // Angular 2 dependencies
        "./node_modules/es6-shim/es6-shim.min.js",
        "./node_modules/systemjs/dist/system-polyfills.js",
        "./node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
        "./node_modules/angular2/bundles/angular2-polyfills.js",
        "./node_modules/systemjs/dist/system.src.js",
        "./node_modules/rxjs/bundles/Rx.js",
        "./node_modules/angular2/bundles/angular2.dev.js",
        "./node_modules/angular2/bundles/http.dev.js",
        "./node_modules/angular2/bundles/router.dev.js"
    ],
    bootstrapCss: ["./node_modules/bootstrap/dist/css/bootstrap.css"],
    bootstrapJs: [
        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
        "./node_modules/jquery/dist/jquery.min.js"]
};

gulp.task("libs", () => {
    // clean libs directory
    del([paths.staticResources + "libs/js/*",
        paths.staticResources + "libs/css/*"], {force: true});

    // copy Angular 2
    gulp.src(paths.angularLibs)
        // .pipe(concat("libs.js"))
        .pipe(gulp.dest(paths.staticResources + "libs/js"));

    // copy Bootstrap JS
    gulp.src(paths.bootstrapJs)
        .pipe(gulp.dest(paths.staticResources + "libs/js"));

    // copy Bootstrap CSS
    gulp.src(paths.bootstrapCss)
        .pipe(gulp.dest(paths.staticResources + "libs/css"));

});

gulp.task("html", () => {
    // clean html files
    del([paths.staticResources + "index.html",
        paths.staticResources + "app/**/*.html"], {force: true});

    gulp.src(paths.workingDir + "index.html")
        .pipe(gulp.dest(paths.staticResources));

    // copy Angular templates
    gulp.src("./app/**/*.html")
        .pipe(gulp.dest(paths.staticResources + "app"));
});

gulp.task("html:w", () => {
    gulp.watch("index.html", {cwd: paths.workingDir}, ["html"]);

    gulp.watch("app/**/*.html", {cwd: paths.workingDir}, ["html"]);

});

gulp.task("sass", function () {
    // clean css files
    del([paths.staticResources + "app/**/*.css"], {force: true});

    // compile sass and copy css
    return gulp.src(paths.workingDir + "app/**/*.scss")
               .pipe(sass.sync().on('error', sass.logError))
               .pipe(gulp.dest(paths.staticResources + "app"));
});

gulp.task("sass:w", function () {
    gulp.watch("app/**/*.scss", {cwd: paths.workingDir}, ['sass']);
});

gulp.task("tsc", function () {
    // clean js files
    del([paths.staticResources + "app/**/*.js"], {force: true});

    // clean map files
    del([paths.staticResources + "app/**/*.map"], {force: true});

    // generate maps and compile typescript
    var tsResult = gulp.src(paths.workingDir + "app/**/*.ts")
                       .pipe(sourcemaps.init())
                       .pipe(ts(tsProject));

    // write maps and copy files
    return tsResult.js
                   .pipe(sourcemaps.write(""))
                   .pipe(gulp.dest(paths.staticResources + "app"));

});

gulp.task("tsc:w", function () {
    gulp.watch("app/**/*.ts", {cwd: paths.workingDir}, ["tsc"]);
});

gulp.task("json", function () {
    // clean json files
    del([paths.staticResources + "app/**/*.json"], {force: true});

    // copy json files
    gulp.src(paths.workingDir + "app/**/*.json")
        .pipe(gulp.dest(paths.staticResources + "app"));
});

gulp.task("json:w", () => {
    gulp.watch("app/**/*.json", {cwd: paths.workingDir}, ["json"]);
});

gulp.task("default", ["build"]);

gulp.task("build", ["libs", "html", "sass", "tsc", "json"]);

gulp.task("watch", ["sass:w", "html:w", "tsc:w", "json:w"]);