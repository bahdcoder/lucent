const path = require('path')
const glob = require('glob-all')
const mix = require('laravel-mix')
const PurgecssPlugin = require('purgecss-webpack-plugin')

require('laravel-mix-tailwind')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}

mix.react('client/index.js', 'public/app.js')
    .react(
        'client/tools/resources/js/index.js',
        'pangaso-resources/tools/resources.js'
    )
    .sass('client/styles/main.scss', 'public/app.css')
    .sass(
        'client/tools/resources/styles/index.scss',
        'pangaso-resources/tools/resources.css'
    )
    .tailwind()

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([path.join(__dirname, 'client/**/*.js')]),
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: ['js']
                    }
                ]
            })
        ]
    })
}
