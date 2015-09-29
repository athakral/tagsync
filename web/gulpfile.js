var gulp    = require('gulp');
var wiredep = require('wiredep');

gulp.task('default', function () {
  wiredep({
    src: 'index.html',
    directory: './bower_components/',
    bowerJson: require('./bower.json'),
  });
});
