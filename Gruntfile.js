module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		jshint: {

			all: "src/*.js"
		},

		concat: {

			options: {

				separator: "\n",
			},

			dist: {

				src: "src/*.js",

				dest: "target/Datum.js"
			}
		},

		uglify: {

			my_target: {

				files: {

					"target/Datum.min.js": "src/*.js"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
};
