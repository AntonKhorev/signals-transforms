var gulp=require('gulp');
var less=require('gulp-less');

gulp.task('index.css',function(){
	gulp.src('src/index.less')
		.pipe(less())
		.pipe(gulp.dest('public_html'));
});

gulp.task('default',['index.css']);
