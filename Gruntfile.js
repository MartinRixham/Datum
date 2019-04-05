module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-mkdir");
	grunt.loadNpmTasks("grunt-concat-define");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-md2html");

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			target: ["src/**", "test/**/*.html", "example/**"]
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

	grunt.registerTask(
		"default",
		["eslint", "qunit", "mkdir", "concat-define", "uglify", "md2html"]);
};
