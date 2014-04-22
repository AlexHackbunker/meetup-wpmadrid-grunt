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

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      media: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js',
          'js/validate.js',
          //'js/custom/*.js'
        ],
        dest: 'js/dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      media: {
        src: ['<%= concat.media.dest %>'],
        dest: 'js/dist/<%= pkg.name %>.min.js'
      }
    },

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

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // JS distribution task.
  grunt.registerTask('default',['clean','concat','uglify','less']);

  grunt.registerTask('clean-dist',['clean']);

};