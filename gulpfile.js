var gulp=require('gulp');
var less=require('gulp-less');

gulp.task('index.css',function(){
	gulp.src('index.less')
		.pipe(less())
		.pipe(gulp.dest('.'));
});

gulp.task('default',['index.css']);
