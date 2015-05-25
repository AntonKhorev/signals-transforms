var gulp=require('gulp');
var sourcemaps=require('gulp-sourcemaps');
var less=require('gulp-less');
var autoprefixer=require('gulp-autoprefixer');
var concat=require('gulp-concat');
var minifyCss=require('gulp-minify-css');

var cssSrc='src/signals-transforms-table.less';
var jsSrc=[
	'src/intro.js',
	'src/helpers.js',
	'src/sections.js',
	'src/transforms.js',
	'src/main.js',
	'src/outro.js'
];

gulp.task('css',function(){
	gulp.src(cssSrc)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(minifyCss({compatibility:'ie7'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public_html'));
});

gulp.task('js',function(){
	gulp.src(jsSrc)
		.pipe(concat('signals-transforms-table.js'))
		.pipe(gulp.dest('public_html'));
});

gulp.task('watch',function(){
	gulp.watch(cssSrc,['css']);
	gulp.watch(jsSrc,['js']);
});

gulp.task('default',['css','js']);
