const path = require('path')
const glob = require('glob-all')
const mix = require('laravel-mix')
const PurgecssPlugin = require('purgecss-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the postCss
 | file for the application as well as bundling up all the JS files.
 |
 */

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}

mix

    /* Resource tool */
    .react(
        'client/tools/resources/js/index.js',
        'src/client/tools/resources/resources.js'
    )
    .postCss(
        'client/tools/resources/styles/index.css',
        'src/client/tools/resources/resources.css',
        [require('tailwindcss')]
    )

    /* Dashboard tool */
    .react(
        'client/tools/dashboard/js/index.js',
        'src/client/tools/dashboard/dashboard.js'
    )
    .postCss(
        'client/tools/dashboard/styles/index.css',
        'src/client/tools/dashboard/dashboard.css',
        [require('tailwindcss')]
    )

    /* user permissions tool */
    .react(
        'client/tools/user-permissions/js/index.js',
        'src/client/tools/user-permissions/user-permissions.js'
    )
    .postCss(
        'client/tools/user-permissions/styles/index.css',
        'src/client/tools/user-permissions/user-permissions.css',
        [require('tailwindcss')]
    )

    // global css and js
    .react('client/index.js', 'src/client/public/js/app.js')
    .postCss('client/styles/main.css', 'src/client/public/css/app.css', [
        require('tailwindcss')
    ])

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
