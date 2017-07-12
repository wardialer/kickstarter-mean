const gruntTasks = require('load-grunt-tasks');

module.exports = ((grunt) => {
    gruntTasks(grunt);

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            scripts: ['**/*.js', '!public/libs/**', '!node_modules/**', '!docs/**'],
        },
        // pre-commit hook
        'git-hooks': {
            hooks: {
                'pre-commit': 'eslint ava',
            },
        },
        // validate js files
        eslint: {
            options: {
                quiet: false,
                fix: false,
            },
            src: ['*.js', '**/*.js', '!docs/**', '!node_modules/**', '!public/libs/**'],
            build: '<%= meta.scripts %>',
        },
        // building documentation
        jsdoc: {
            dist: {
                src: ['app/**/*.js'],
                options: {
                    destination: 'docs',
                    template: 'node_modules/ink-docstrap/template',
                    configure: 'jsdoc.conf.json',
                },
            },
        },
        // minify js files
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
            },
            build: {
                files: {
                    'public/dist/js/app.min.js': 'public/js/**/*.js',
                },
            },
        },
        // preprocess sass files
        sass: {
            options: {
                sourceMap: true,
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/css/sass/',
                    src: ['*.scss'],
                    dest: 'public/css',
                    ext: '.css',
                }],
            },
        },
        // minify css files
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
            },
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/css/**/*.css',
                },
            },
        },
        // preprocess index.html
        targethtml: {
            dist: {
                files: {
                    'public/views/index.html': 'public/views/index.src.html',
                },
            },
            dev: {
                files: {
                    'public/views/index.html': 'public/views/index.src.html',
                },
            },
        },
        // create dist package
        compress: {
            main: {
                options: {
                    archive: 'public/dist/<%= pkg.version %>/<%= pkg.name %>.tar.gz',
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            'public/dist/**/*.js',
                            'public/dist/**/*.css',
                            'public/views/**',
                            'config/**',
                            'app/**',
                            '.bowerrc',
                            'bower.json',
                            'package.json',
                            'server.js',
                        ],
                        dest: '',
                    },
                ],
            },
        },
        // autoupdate
        watch: {
            stylesheets: {
                files: ['public/css/sass/*.scss'],
                tasks: ['sass'],
            },
            scripts: {
                files: '<%= meta.scripts %>',
                tasks: ['eslint'],
            },
            html: {
                files: 'public/views/index.src.html',
                tasks: ['targethtml:dev'],
            },
            test: {
                files: 'test/*.js',
                tasks: ['ava'],
            },
        },
        // nodemon
        nodemon: {
            dev: {
                script: './server.js',
            },
        },
        // parallell execution of nodemon and watch
        concurrent: {
            options: {
                logConcurrentOutput: true,
            },
            tasks: ['nodemon', 'watch'],
        },
        // testing with ava
        ava: {
            test: ['test/**/*.js'],
            nycTest: {
                options: {
                    verbose: true,
                    nyc: false,
                },
                files: {
                    src: ['test/*.js'],
                },
            },
        },
    });

    grunt.registerTask('default', ['eslint', 'sass', 'targethtml:dev', 'concurrent']);
    grunt.registerTask('build', ['eslint', 'ava', 'uglify', 'sass', 'cssmin', 'targethtml:dist', 'compress']);
});
