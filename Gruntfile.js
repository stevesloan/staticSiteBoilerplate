module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'src/css/style.css' : 'src/css/style.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['style.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        },
      {
        expand: true,
        cwd: 'css',
        src: ['critical.css', '!*.min.css'],
        dest: 'css',
        ext: '.min.css'
      }]
      },
    },
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'dist/js/main.min.js': ['src/js/*.js']
        }
      }
    },
    criticalcss: {
      custom: {
        options: {
          url: '127.0.0.1:9000/src/',
          width: 1200,
          height: 900,
          outputfile: 'dist/css/critical.css',
          filename: 'src/css/style.css', // Using path.resolve( path.join( ... ) ) is a good idea here
          buffer: 800 * 1024
        }
      }
    },
    inline: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    dev_prod_switch: {
      options: {
        environment: 'dev',
        env_char: '#',
        env_block_dev: 'env:dev',
        env_block_prod: 'env:prod'
      },
      all: {
        files: {
          'dist/index.html': 'dist/index.html',
          'dist/js/main.js': 'dist/js/main.js'
        }
      }
    },
    watch: {
      css: {
        files: 'src/css/*.scss',
        tasks: ['sass'],
        //tasks: ['sass', 'criticalcss', 'cssmin', 'inline']
        options: { livereload: true }
      },
      html: {
        files: 'src/*.html',
        tasks: [],
        options: { livereload: true }
      },
      js : {
        files: 'src/js/*.js',
        tasks: [],
        options: { livereload: true }
      },
      svg : {
        files: 'src/img/*.svg',
        tasks: ['svgmin'],
        options: { livereload: true }
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['dist/**/*'],
      }
    },
    
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '0.0.0.0'
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          //keepalive: true
        }

      }
    }
   

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-dev-prod-switch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['sass', 'cssmin', 'inline', 'uglify']);
  grunt.registerTask('images', ['svgmin', 'cssmin']);
  grunt.registerTask('server', ['connect','watch']);
}
