import del from "del";
import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import sass from "gulp-sass";
import image from "gulp-image";

sass.compiler = require("node-sass");

const routes = {
  style: {
    src: "src/scss/style.scss",
    dist: "dist/css/",
    watch: "src/scss/*.scss",
  },
  image: {
    src: "src/img/*",
    dist: "dist/img/",
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

const img = () =>
  gulp.src(routes.image.src).pipe(image()).pipe(gulp.dest(routes.image.dist));

const prepare = gulp.series([clean]);

const assets = gulp.series([style, img]);

const live = gulp.series([watch]);

export const dev = gulp.series([prepare, assets, live]);
