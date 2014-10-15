module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/*.js',
        'examples/**/*.js'
      ]
    },
    jasmine: {
      components: {
        src: [
          'node_modules/koine-publisher/dist/*js',
          'src/*js'
        ],
        options: {
          specs: 'specs/*_spec.js',
          keepRunner : true,
          display : 'short',
          summary : true,
          helpers: 'specs/helpers/*.js'
        }
      }
    },
    uglify: {
      minify: {
        files: {
          'dist/Koine.Decorators.min.js': [
            'src/Koine.Decorators.Dom.ElementDecorator.js',
            'src/Koine.Decorators.Dom.InputDecorator.js',
            'src/Koine.Decorators.Dom.SelectDecorator.js',
            'src/Koine.Decorators.Dom.SelectOptionDecorator.js',
          ]
        }
      },
      withDependencies: {
        files: {
          'dist/Koine.Decorators.with-dependencies.min.js': [
            'node_modules/koine-publisher/src/*js',
            'src/Koine.Decorators.Dom.ElementDecorator.js',
            'src/Koine.Decorators.Dom.InputDecorator.js',
            'src/Koine.Decorators.Dom.SelectDecorator.js',
            'src/Koine.Decorators.Dom.SelectOptionDecorator.js',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('jshintage', [
    'jshint',
  ]);

  grunt.registerTask('test', [
    'jasmine',
  ]);

  grunt.registerTask('travis', [
    'jasmine',
    'jshint',
    'uglify'
  ]);
};
