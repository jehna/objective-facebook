module.exports = function(grunt) {
    var wrapper = grunt.file.read('src/wrapper.js').split('CONTENT');
    grunt.initConfig({
        wrap: {
            default: {
                src: ['dist/*.js'],
                dest: '.',
                options: {
                    wrapper: wrapper
                }
            }
        },
        express: {
            all: {
                options: {
                    port: 9121,
                    hostname: "localhost",
                    bases: ['examples', 'dist'],
                    livereload: true
                }
            }
        },
        typescript: {
            dist: {
                src: ['src/app.ts'],
                dest: 'dist/app.js',
                options: {
                    basePath: 'src/',
                    target: 'es5',
                    module: 'commonjs',
                    //sourceMap: true
                }
            }
        },
        watch: {
            files: ['src/**/*.ts', 'src/*.ts', 'test/**/*.js'],
            tasks: ['typescript', 'wrap', 'test'],
            options: {
                livereload: true
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>/userimage.html'
            }
        },
        karma: {
            options: {
                // point all tasks to karma config file
                configFile: 'test/karma-conf.js'
            },
            unit: {
                // run tests once instead of continuously
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-open');
    
    grunt.registerTask('default', ['typescript', 'wrap', 'express', 'open', 'test', 'watch']);
    grunt.registerTask('test', ['karma']);

};