import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import del from "del";

sass.compiler = require("node-sass");

const routes = {
  style: {
    src: "src/scss/style.scss",
    dist: "dist/css/",
    watch: "src/scss/*.scss",
  },
};

const watch = () => {
  gulp.watch(routes.style.watch, style);
};

const clean = () => del(["dist"]);

const style = () =>
  gulp
    .src(routes.style.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.style.dist));

const prepare = gulp.series([clean]);

const assets = gulp.series([style]);

const live = gulp.series([watch]);

export const dev = gulp.series([prepare, assets, live]);
