module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 4 versions'],
      add: true,
      remove: false,
      flexbox: true
    })
  ]
}