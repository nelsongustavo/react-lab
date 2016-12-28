import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {

  return browserify("src/components.js")
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});