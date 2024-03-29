
module.exports = function( grunt ) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',

    jshint: {
      dev: [ 'src/**/*.js'  ],
      options: grunt.file.readJSON('.jshintrc')
    },

    copy: {
      js: {
        files: {
          'dist/ui-router-redirectTo.js': [ 'src/ui-router-redirectTo.js' ]
        }
      }
    },

    uglify: {
      min: {
        files: {
          'dist/ui-router-redirectTo.min.js': [ 'dist/ui-router-redirectTo.js' ]
        }
      }
    },

    usebanner: {
      dist: {
        files: {
          src: [
            'dist/ui-router-redirectTo.js',
            'dist/ui-router-redirectTo.min.js'
          ]
        },
        options: {
          position: 'top',
          banner: '<%= banner %>'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask( 'default', [
    'test'
  ]);

  grunt.registerTask( 'dist', [
    'jshint',
    'copy',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask( 'test', [
    'jshint'
  ]);

};
