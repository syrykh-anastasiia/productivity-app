'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'webpack', 'autoprefixer', 'del']
});
let isDevelopment = true;
const path = require('path');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const settings = require('./gulp-settings.js');
const postcssPlagins = [
	plugins.autoprefixer({
		browsers: ['last 2 version']
	})
];

const reloadPage = (cb) => {
	browserSync.reload();
	cb();
}

// compile from sass to css
gulp.task('allSass', () => {
	const entryDir = settings.scssDir.entry;

	return gulp.src(
		path.resolve(__dirname, entryDir + '/**/*.scss'),
		{
			base: entryDir
		}
	)
	.pipe(plugins.cached('allSass'))
	.pipe(plugins.sassMultiInheritance({dir: entryDir + '/'}))
	.pipe(plugins.plumber(function(error) {
		plugins.util.log(plugins.util.colors.bold.red(error.message));
		plugins.util.beep();
		this.emit('end');
	}))
	.pipe(plugins.if(isDevelopment, plugins.sourcemaps.init()))
	.pipe(plugins.sass().on('error', plugins.sass.logError))
	.pipe(plugins.postcss(postcssPlagins))
	.pipe(plugins.if(isDevelopment, plugins.sourcemaps.write('./')))
	.pipe(plugins.plumber.stop())
	.pipe(gulp.dest(function(file) {
		return file.stem === settings.scssDir.mainFileName || file.stem === settings.scssDir.mainFileName + '.css' ?
			path.resolve(__dirname, settings.scssDir.mainFileOutput) :
			path.resolve(__dirname, settings.scssDir.output);
	}))
	.pipe(plugins.count('## files sass to css compiled', {logFiles: true}))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

// compile from less to css
gulp.task('allLess', function () {
    const less = require('gulp-less');
    const entryDir = settings.lessDir.entry;

    return gulp.src(
        path.resolve(__dirname, entryDir + '/**/main.less'),
        {
            base: entryDir
        }
	)
	.pipe(less())
	.pipe(concat('css/main.css'))
	.pipe(gulp.dest(function(file) {
        return file.stem === settings.lessDir.mainFileName || file.stem === settings.lessDir.mainFileName + '.css' ?
            path.resolve(__dirname, settings.lessDir.mainFileOutput) :
            path.resolve(__dirname, settings.lessDir.output);
    }))
    .pipe(plugins.count('## files less to css compiled', {logFiles: true}))
	.pipe(browserSync.stream({match: 'css/*.css'}));
});

//concat all JS files
gulp.task('allJs', function () {
    return gulp.src(['js/**/*.js', '!js/libs/*.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest(settings.jsDir.output))
	.pipe(browserSync.stream({match: 'js/**/*.js'}));
});

// server
gulp.task('server', cb => {
	browserSync.init({
		server: {
			baseDir: settings.publicDir,
			port: 3010,
			directory: true,
			notify: false
		}
	}, cb);
});

gulp.task('copyScripts', () => {
	return gulp.src(
		[
			path.resolve(__dirname, settings.jsDir.entry + '/**/*.js')
		],
		{
			base: path.resolve(__dirname, settings.jsDir.entry)
		}
	)
	.pipe(plugins.cached('copyScripts'))
	.pipe(gulp.dest(settings.jsDir.output))
	.pipe(plugins.count('## JS files was copied', {logFiles: true}));
});

// image optimization
gulp.task('imagesOptimize', () => {
	const entry = path.resolve(__dirname, settings.imagesDir.entry + '/**/*.+(png|jpg|gif|svg)');
	const output = path.resolve(__dirname, settings.imagesDir.output);

	return gulp.src(
		entry,
			{
				base: path.resolve(__dirname, settings.imagesDir.entry)
			}
		)
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(output))
		.pipe(plugins.count('## images was optimize', {logFiles: true}));
});

const beautifyMainCss = () => {
	const cssUrl = path.resolve(__dirname, settings.scssDir.mainFileOutput + '/' + settings.scssDir.mainFileName);

	return gulp.src(
			`${cssUrl}.css`,
			{
				base: path.resolve(__dirname, settings.scssDir.output)
			}
		)
		.pipe(plugins.csscomb())
		.pipe(gulp.dest(cssUrl))
		.pipe(plugins.count('beautified css files', {logFiles: true}));
};

const beautifyOtherCss = () => {
	const cssUrl = path.resolve(__dirname, settings.scssDir.output);

	return gulp.src(
			[
				path.resolve(__dirname, settings.scssDir.output + '/*css'),
				path.resolve(__dirname, settings.scssDir.output + '/*min.css')
			],
			{
				base: cssUrl
			}
		)
		.pipe(plugins.csscomb())
		.pipe(gulp.dest(cssUrl))
		.pipe(plugins.count('beautified css files', {logFiles: true}));
};

// css beautify
gulp.task('beautify', gulp.parallel(beautifyMainCss, beautifyOtherCss));

gulp.task('assets', (cb) => {
	return gulp.src(
			path.resolve(__dirname, settings.assetsDir + '/**'),
			{
				base: path.resolve(__dirname, settings.assetsDir)
			}
		)
		.pipe(plugins.cached('assets'))
		.pipe(gulp.dest(path.resolve(__dirname, settings.publicDir)))
		.pipe(plugins.count('## assets files copied', {logFiles: true}));
});

gulp.task('watch', function(cb) {
	gulp.watch(
		path.resolve(__dirname, settings.lessDir.entry + '/**/*.less'),
		gulp.series('allLess')
	).on('unlink', function(filePath) {
		delete plugins.cached.caches.allLess[path.resolve(filePath)];
	});

	gulp.watch(
		[
			path.resolve(__dirname, settings.jsDir.entry + '/*')
		],
		gulp.series('copyScripts')
	).on('unlink', function(filePath) {
		delete plugins.cached.caches.copyScripts[path.resolve(filePath)];
	});

	gulp.watch(
		path.resolve(__dirname, settings.assetsDir + '/**'),
		gulp.series('assets')
	).on('error', () => {})
	.on('unlink', function(filePath) {
		delete plugins.cached.caches.assets[path.resolve(filePath)];
	});

	gulp.watch(
		[
			path.resolve(__dirname, settings.jsDir.output + '/*.js'),
			path.resolve(__dirname, settings.publicDir + '/*.html')
		],
		gulp.series(reloadPage)
	);
	cb();
});

gulp.task('clear', (cb) => {
	plugins.del(path.resolve(__dirname, settings.publicDir), {read: false}).then(paths => {
		cb();
	});
});

gulp.task('build', gulp.parallel(
	'assets',
	//'copyScripts',
	'allJs',
	'allLess',
));
gulp.task('dist', gulp.series(
	(cb) => {
		isDevelopment = false;
		cb();
	},
	'clear',
	'build',
	gulp.parallel('imagesOptimize', 'beautify')
));
gulp.task('default', gulp.series('build', 'server', 'watch'));

