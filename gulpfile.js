var gulp=require('gulp');
var less=require('gulp-less');

gulp.task('index.css',function(){
	gulp.src('src/index.less')
		.pipe(less())
		.pipe(gulp.dest('public_html'));
});

gulp.task('watch',function(){
	gulp.watch('src/index.less',['index.css']);
});

gulp.task('default',['index.css']);
