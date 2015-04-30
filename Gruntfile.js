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
          url: 'https://dev.stevesloan.ca/bsaDevice',
          width: 1200,
          height: 900,
          outputfile: 'css/critical.css',
          filename: 'css/style.css', // Using path.resolve( path.join( ... ) ) is a good idea here
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
    svgmin: {
      options: {
        plugins: [
          {
  removeViewBox: false
          }, {
  removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: {
          'src/img/unicorn.svg': 'dist/img/unicorn.svg'
        }
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
        tasks: ['sass',  'cssmin']
        //tasks: ['sass', 'criticalcss', 'cssmin', 'inline']
      },
      html: {
        files: 'src/*.html',
        tasks: ['inline']
      },
      js : {
        files: 'src/js/*.js',
        tasks: ['uglify']
      },
      svg : {
        files: 'src/img/*.svg',
        tasks: ['svg2png']
      }
    },
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '0.0.0.0',
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: true
        }

      }
    },
    svg2png: {
      all: {
        // specify files in array format with multiple src-dest mapping
        files: [
          // rasterize all SVG files in "img" and its subdirectories to "dist/img/png"
          {cwd: 'src/img/', src: ['**/*.svg'], dest:'dist/img/png/'}
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-dev-prod-switch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['sass', 'criticalcss', 'cssmin', 'inline', 'uglify']);
  grunt.registerTask('images', ['svgmin', 'cssmin']);
  grunt.registerTask('server', ['connect']);
}
