/* jshint node: true */

module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %> by @Alex.Hackbunker\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*/\n',

    // Task configuration.

    clean: {
      assets: ['js/dist/*','css/*'],
      images: ['images/dist/*']
    },

    /* Watch task : CONCAT  */
    concat: {
      options: {
        banner: '<%= banner %>',
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
        src: ['js/bootstrap/*.js','main.js']
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
    },

    /* Watch task : Image Optim */
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/dist/'
        }]
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.2manydevelopers.es',
          port: 21,
          authKey: 'dev'
        },
        src: '.',
        dest: '/public_html/',
        exclusions: ['node_modules/*']
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // JS distribution task.
  grunt.registerTask('default',['clean:assets','jshint','concat','uglify','less']);

  grunt.registerTask('images-dist',['newer:imagemin']);

  grunt.registerTask('clean-assets',['clean:assets']);

  grunt.registerTask('clean-images',['clean:images']);

  grunt.registerTask('deploy',['ftp-deploy']);

};