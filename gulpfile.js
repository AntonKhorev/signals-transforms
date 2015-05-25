var gulp=require('gulp');
var less=require('gulp-less');
var autoprefixer=require('gulp-autoprefixer');
var concat=require('gulp-concat');

gulp.task('css',function(){
	gulp.src('src/signals-transforms-table.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('public_html'));
});

gulp.task('js',function(){
	gulp.src([
		'src/intro.js',
		'src/helpers.js',
		'src/sections.js',
		'src/transforms.js',
		'src/main.js',
		'src/outro.js'
	])
		.pipe(concat('signals-transforms-table.js'))
		.pipe(gulp.dest('public_html'));
});

gulp.task('watch',function(){
	gulp.watch('src/signals-transforms-table.less',['css']);
});

gulp.task('default',['css','js']);
