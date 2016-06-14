
'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		config: {
			paths: {
				src: 	'./src/',
				dist: 	'./dist/',
				demo: 	'./demo/',
			}
		},

		clean: {
			dist: {
				options: {
					force: true,
				},
				src: '<%= config.paths.dist %>',
			},
		},

		sass: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= config.paths.src %>sass/',
					src: [
						'<%= pkg.name %>.scss',
						'themes/default.scss'
						],
					dest: '<%= config.paths.dist %>',
					ext: '.css',
				}]
			},
		},
		postcss: {
			options: {
				processors: [
					require('pixrem')(),
					require('autoprefixer')({browsers: 'last 2 versions'}),
				],
			},
			dest: {
				src: '<%= config.paths.dist %>**/*.css'
			}
		},
		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= config.paths.dist %>',
					src: ['**/*.css', '!**/*.min.css'],
					dest: '<%= config.paths.dist %>',
					ext: '.min.css'
				}]
			},
		},

		concat: {
			main: {
				src: [
					'<%= config.paths.src %>js/jquery.<%= pkg.name %>.js',
				],
				dest: '<%= config.paths.dist %>jquery.<%= pkg.name %>.js'
			},
		},
		uglify: {
			main: {
				files: {
					'<%= config.paths.dist %>jquery.<%= pkg.name %>.min.js': ['<%= config.paths.dist %>jquery.<%= pkg.name %>.js']
				}
			},
		},

		browserSync: {
			bsFiles: {
				src : [
					'<%= config.paths.dist %>**/*.*',
					'<%= config.paths.demo %>**/*.*'
				]
			},
			options: {
				watchTask: true,
				port: 1337,
		        server: {
		            baseDir: './',
		            index: './demo/index.html'
		        }
		    }
		},

		watch: {
			configFiles: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				}
			},
			css: {
				files: '<%= config.paths.src %>sass/**/*.scss',
				tasks: [
					'sass:main',
					'postcss',
					'cssmin:main',
				],
				options: {
                    spawn: false,
                }
			},
			scripts: {
				files: '<%= config.paths.src %>js/**/*.js',
				tasks: [
					'concat:main',
					'uglify:main',
				],
				options: {
                    spawn: false,
                }
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [

		'clean:dist',

		'sass:main',
		'postcss',
		'cssmin:main',

		'concat:main',
		'uglify:main',
		
	]);

	grunt.registerTask('serve', [

		'default',
		'browserSync',
		'watch',

	]);

};