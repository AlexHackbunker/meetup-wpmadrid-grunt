/* jshint node: true */

module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %> by @fobiaxx & @Alex.Hackbunker\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*/\n',

    // Task configuration.

    clean: {
      dist: ['js/dist/*','css/*']
    },

    /* Watch task : CONCAT  */
    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          '/js/bootstrap/*.js'
        ],
        dest: 'js/dist/bootstrap.js'
      },
      main: {
        src: [
          'js/main.js',
        ],
        dest: 'js/dist/main.js'
      }
    },

    /* Watch task : UGLIFY  */
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        src: ['js/dist/bootstrap.js'],
        dest: 'js/dist/bootstrap.min.js'
      },
      main: {
        src: ['js/dist/main.js'],
        dest: 'js/dist/main.min.js'
      }
    },

    /* Watch task : LESS  */
    less: {
      compile: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'css/<%= pkg.name %>.css.map'
        },
        files: {
          'css/<%= pkg.name %>.css': 'less/bootstrap.less'
        }
      },
      compress: {
        options: {
          compress: true
        },
        files: {
          'css/<%= pkg.name %>.min.css': 'css/<%= pkg.name %>.css'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js']
      }
    },

    /* Watch task : RECESS  + UGLIFY */
    watch: {
      recess: {
        files: ['less/*.less'],
        tasks: ['less']
      },
      uglify: {
        files: ['js/*.js'],
        tasks: ['jshint','concat','uglify']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // JS distribution task.
  grunt.registerTask('default',['clean','jshint','concat','uglify','less']);

  grunt.registerTask('clean-dist',['clean']);

};