module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		jshint: {

			all: ["src/**/*.js", "test/**/*.html", "examples/**/*.js"],
			options: {

				extract: "auto"
			}
		},
		jscs: {

			src: ["src/**/*.js", "test", "examples/**/*.js"],
			options: {

				config: ".jscsrc",
				esnext: false,
				verbose: true,
				fix: false,
				extract: ["test/**/*.html"]
			}
		},
		qunit: {

			options: {

				inject: "bridge.js"
			},
			all: ["test/**/*.html"]
		},
		mkdir: {

			all: {
				options: {

					create: ["target"]
				}
			}
		},
		"concat-define": {

			options: {

				sourceRootDirectory: "src",
				outputFile: "target/Datum.js",
				main: "Datum"
			}
		},
		uglify: {

			my_target: {

				files: {

					"target/Datum.min.js": [

						"target/Datum.js"
					]
				}
			}
		},
		md2html: {

			one_file: {

				files: [{

					src: ["README.md"],
					dest: "docs/readme.html"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-mkdir");
	grunt.loadNpmTasks("grunt-concat-define");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-md2html");

	grunt.registerTask(
		"default",
		["jshint", "jscs", "qunit", "mkdir", "concat-define", "uglify", "md2html"]);
};
