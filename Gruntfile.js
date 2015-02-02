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
                    sourceMap: true
                }
            }
        },
        watch: {
            files: ['src/**/*.ts', 'src/*.ts'],
            tasks: ['typescript', 'wrap'],
            options: {
                livereload: true
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>/user.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-open');
    
    grunt.registerTask('default', ['typescript', 'wrap', 'express', 'open', 'watch']);

};