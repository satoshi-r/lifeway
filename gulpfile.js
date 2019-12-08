var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	cleancss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rsync = require('gulp-rsync'),
	newer = require('gulp-newer'),
	rename = require('gulp-rename'),
	responsive = require('gulp-responsive'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	notify = require('gulp-notify'),
	debug = require('gulp-debug'),
	del = require('del');

// Local Server
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'lifeway', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function () {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: [__dirname + '/node_modules']
		}))
		.on('error', notify.onError(function (err) {
			return {
				title: 'Styles',
				message: err.message
			}
		}))
		.pipe(concat('styles.min.css'))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

// Scripts & JS Libraries (библиотеки в начало)
gulp.task('scripts', function () {
	return gulp.src([
		'node_modules/tiny-slider/dist/min/tiny-slider.js', 
		'app/js/_*.js'
	])
		.pipe(concat('scripts.min.js'))
		//.pipe(uglify()) // Minify js (opt.)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true }))
});

// Responsive Images
var quality = 95; // Responsive images quality

// Produce @1x images
gulp.task('img-responsive-1x', async function () {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(newer('app/img/@1x'))
		.pipe(responsive({
			'**/*': { width: '50%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
		.pipe(gulp.dest('app/img/@1x'))
});
// Produce @2x images
gulp.task('img-responsive-2x', async function () {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw,svg}')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(newer('app/img/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
		.pipe(gulp.dest('app/img/@2x'))
});
gulp.task('img', gulp.series('img-responsive-1x', 'img-responsive-2x', bsReload));

// Clean @*x IMG's
gulp.task('cleanimg', function () {
	return del(['app/img/@*'], { force: true })
});

// Code & Reload
gulp.task('code', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function () {
	return gulp.src('app/')
		.pipe(rsync({
			root: 'app/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// include: ['*.htaccess'], // Included files
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});

// build
gulp.task('css:public', function () {
	return gulp.src('app/css/*.css')
		.pipe(gulp.dest('public/css'))
		.pipe(debug({ title: 'dest' }))
});

gulp.task('js:public', function () {
	return gulp.src('app/js/scripts.min.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'))
		.pipe(debug({ title: 'dest' }))
});

gulp.task('html:public', function () {
	return gulp.src('app/*.{html,htaccess,access}')
		.pipe(gulp.dest('public/'))
		.pipe(debug({ title: 'dest' }))
});

gulp.task('img:public', function () {
	return gulp.src(['app/img/@*/**', 'app/img/*.{png,jpg,jpeg,webp,raw,ico,svg}'])
		.pipe(gulp.dest('public/img/'))
		.pipe(debug({ title: 'dest' }))
});

gulp.task('fonts:public', function () {
	return gulp.src(['app/fonts/*', '!app/fonts/_src/**'])
		.pipe(gulp.dest('public/fonts/'))
		.pipe(debug({ title: 'dest' }))
});

gulp.task('clean:public', function () {
	return del('public')
});

gulp.task('public', gulp.series('clean:public', gulp.parallel('css:public', 'js:public', 'html:public', 'img:public', 'fonts:public')));
// end build

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['app/js/_custom.js', 'app/js/_libs.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));
