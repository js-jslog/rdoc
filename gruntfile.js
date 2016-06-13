require('load-grunt-tasks')(grunt);
grunt.initConfig({
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'dist/app.js': 'src/app.js'
            }
        }
    }
});

grunt.registerTask('default', ['babel']);