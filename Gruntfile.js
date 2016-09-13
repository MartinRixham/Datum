module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		jshint: {

			all: ["src/*.js", "test/*.html", "examples/**/*.js"],
			options: {

				extract: "auto"
			}
		},
		jscs: {

			src: ["src/*.js", "test", "examples/**/*.js"],
			options: {

				config: ".jscsrc",
 				esnext: false,
				verbose: true,
				fix: false,
				extract: ["test/*.html"]
			}
		},
		qunit: {

			options: {

				inject: "bridge.js"
			},
			all: ["test/*"]
		},
		"concat-define": {

			options: {

				sourceRootDirectory: "src",
				outputFile: "target/Datum.js"
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
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks("grunt-concat-define");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "jscs", "qunit", "concat-define", "uglify"]);
};
