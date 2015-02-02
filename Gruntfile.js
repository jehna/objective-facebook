module.exports = function(grunt) {

    grunt.initConfig({
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
            tasks: ['typescript'],
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
    grunt.loadNpmTasks('grunt-open');
    
    grunt.registerTask('default', ['typescript', 'express', 'open', 'watch']);

};