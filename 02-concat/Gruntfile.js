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
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\"RedBull Arcade Theme requires jQuery\") } else { jQuery("html").removeClass("no-js").addClass("js") }\n\n',


    // Task configuration.
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
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // JS distribution task.
  grunt.registerTask('default',['concat']);

};