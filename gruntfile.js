module.exports = function(grunt) {  
    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'build'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask("default", ["babel"]);
};