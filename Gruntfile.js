module.exports = function(grunt) {
    const Fiber = require('fibers'),
        sass = require('node-sass');
    
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                implementation: sass,
                fiber: Fiber,
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/css/sushislides.css': 'src/sass/sushislides.scss',
                    'assets/css/theme/default.css': 'src/sass/theme/default/default.scss'
                }
            }
        },
        uglify: {
            prod: {
                files: {
                    'assets/js/sushiSlides.min.js': ['src/js/*']
                }
            }
        },
        concat: {
            dist: {
                src: ['src/js/*'],
                dest: 'assets/js/sushiSlides.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                },
            },
            stylesheets: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['*.html'],
                options: {
                    livereload: true,
                }
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'concat']);

};