module.exports = function(grunt) {

    grunt.initConfig({
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
            tasks: ['typescript']
        }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');

  grunt.registerTask('default', ['typescript', 'watch']);

};