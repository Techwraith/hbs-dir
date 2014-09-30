var hb = require('handlebars')
  , fs = require('vinyl-fs')
  , map = require('vinyl-map')

module.exports = function (opts, cb) {
  if (!opts || typeof opts === 'function') throw new Error('opts is required')
  if (!opts.origin) throw new Error('opts.origin is required')
  if (!opts.target) throw new Error('opts.target is required')
  if (!opts.context) throw new Error('opts.context is required')
  var render = map(function (code, filename) {
    var t = hb.compile(code.toString())
    return t(opts.context)
  })
  fs.src([opts.origin+'/**'])
    .pipe(render)
    .pipe(fs.dest(opts.target))
    .on('error', cb)
    .on('end', cb)
}
