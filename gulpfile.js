var gulp=require('gulp');
var less=require('gulp-less');
var autoprefixer=require('gulp-autoprefixer');

gulp.task('index.css',function(){
	gulp.src('src/index.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('public_html'));
});

gulp.task('watch',function(){
	gulp.watch('src/index.less',['index.css']);
});

gulp.task('default',['index.css']);
