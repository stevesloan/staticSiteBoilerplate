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
			  cwd: 'src/css',
			  src: ['critical.css', '!*.min.css'],
			  dest: 'src/css',
			  ext: '.min.css'
			}]
		  },
		  
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'dist/main.min.js': ['src/main.js']
				}
			}
		},
		criticalcss: {
			custom: {
				options: {
					url: "http://dev.stevesloan.ca/iportaProjects/iportaSite3/dist/",
					width: 1200,
					height: 900,
					outputfile: "src/css/critical.css",
					filename: "src/css/style.css", // Using path.resolve( path.join( ... ) ) is a good idea here
					buffer: 800*1024
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
				tasks: ['sass','criticalcss','cssmin','inline']
			},
			html: {
				files: 'src/*.html',
				tasks: ['inline']
			},
			js : {
				files: 'src/js/*.js',
				tasks: ['uglify']
			}
		}
		
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-criticalcss');
	grunt.loadNpmTasks('grunt-inline');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-dev-prod-switch');
	
	grunt.registerTask('default',['sass','criticalcss','cssmin','inline','uglify',]);
	grunt.registerTask('images',['svgmin','cssmin']);
	
}