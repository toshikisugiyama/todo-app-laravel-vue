const mix = require('laravel-mix')
mix.browserSync('nginx')
  .ts('resources/ts/app.ts', 'public/js')
  .sass('resources/scss/app.scss', 'public/css')
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        }
      ]
    }
  })
  .version()
