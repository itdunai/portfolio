const gulp = require("gulp"),
sass = require('gulp-sass')(require('sass')),
autoprefixer = require("gulp-autoprefixer"),
browserSync = require("browser-sync"),
/*imagemin = require("gulp-imagemin"),*/
fileinclude = require('gulp-file-include'),
clean = require('gulp-clean-css');


// build tasks

gulp.task("buildHtml", function(){
	return gulp.src("src/*.html")
	.pipe(fileinclude({prefix: '@@', basepath: '@file'}))
	.pipe(gulp.dest("build/"))
    .pipe(gulp.dest('build/'));
});
gulp.task("buildCss", function(){
	return gulp.src("src/scss/main.scss")
	.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 8 versions"]
	}))
	.pipe(gulp.dest("build/css/"))
});
gulp.task("buildFonts", function(){
	return gulp.src("src/scss/fonts/*.*")
	.pipe(gulp.dest("build/css/fonts/"))
})
gulp.task("buildJs", function(){
	return gulp.src("src/js/*.js")
	.pipe(gulp.dest("build/js"))
});
gulp.task("buildImages", function(){
	return gulp.src("src/images/**/*.*")
	/*.pipe(imagemin())*/
	.pipe(gulp.dest("build/images/"))
});

gulp.task("build", gulp.parallel("buildHtml", "buildCss", "buildFonts", "buildJs", "buildImages"));

// dev tasks

gulp.task("scss", function(){
	return gulp.src("src/scss/main.scss")
	.pipe(sass({
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 8 versions"]
	}))
	.pipe(gulp.dest("app/css/"))
	.pipe(browserSync.reload({stream: true}))
})

gulp.task("fonts", function(){
	return gulp.src("src/scss/fonts/*.*")
	.pipe(gulp.dest("app/css/fonts/"))
})

gulp.task("js", function(){
	return gulp.src("src/js/*.js")
	.pipe(gulp.dest("app/js"))
	.pipe(browserSync.reload({stream: true}))
})

gulp.task("images", function(){
	return gulp.src("src/images/*.*")
	/*.pipe(imagemin())*/
	.pipe(gulp.dest("app/images/"))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task("html", function(){
	return gulp.src("src/*.html")
	.pipe(fileinclude({prefix: '@@', basepath: '@file',}))
	.pipe(gulp.dest("app/"))	
	.pipe(browserSync.reload({stream: true}))
})

gulp.task("browser", function(){
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
});

// clean
gulp.task("clean", function(){
	return gulp.src("app/", {read: false})
	.pipe(clean());
})

gulp.task("watch", function(){
	gulp.watch("src/**/*.html", gulp.parallel("html"));
	gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
	gulp.watch("src/js/*.js", gulp.parallel("js"));
	gulp.watch("src/images/*.*", gulp.parallel("images"));
});
gulp.task("dev", gulp.parallel("scss", "html", "js", "browser", "fonts", "watch", "images"))