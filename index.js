var hb = require('handlebars')
  , fs = require('vinyl-fs')
  , map = require('vinyle-map')

module.exports = function (opts, cb) {
  if (!opts || typeof opts == 'function') throw new Error('opts is required')
  if (!opts.origin) throw new Error('opts.origin is required')
  if (!opts.target) throw new Error('opts.target is required')
  if (!opts.context) throw new Error('opts.context is required')
  var render = map(function (code, filename) {
    var t = hb.compile(code)
    return t(opts.context)
  })
  fs.src([opts.origin+'/*.hbs', opts.origin+'/**/*.hbs'])
    .pipe(render)
    .pipe(fs.dest(opts.target))
}
