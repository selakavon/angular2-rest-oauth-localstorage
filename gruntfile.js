module.exports = function (grunt) {
  grunt.initConfig({
      
    appName: "JoggingTracker",
        
    pkg: grunt.file.readJSON('package.json'),
    buildFolder: "build",
    distFolder: 'dist',
    srcFolder: ".",
    htmlFile: "index.html",
    htmlSrcFolder: "<%= srcFolder %>/html",
    htmlDistFile: "<%= distFolder %>/<%= htmlFile %>",
    htmlSrcFile: "<%= htmlSrcFolder %>/<%= htmlFile %>",
    
    bundleName: "<%= pkg.name %>.<%= pkg.version %>",
    bundleJsFile: "<%= bundleName %>.js",
    bundleJsMapFile: "<%= bundleJsFile %>.map",
    bundleMinJsFile: "<%= bundleName %>.min.js",
    bundleMinCssFile: "<%= bundleName %>.min.css",
      
    clean: {
      build: ["<%= buildFolder %>"],
      dist: ["<%= distFolder %>"]
    },

    // typescript compile
    ts: {
      frontend: {tsconfig: 'tsconfig.json'}
    },

    tslint: {
      options: {configuration: './tslint.json'},
      frontend: {src: ['app/**/*.ts']}
    },

    watch: {
      frontend: {
        files: ['app/**/*.ts'],
        tasks: [
          'tslint:frontend',
          'ts:frontend'
        ],
     }
    },
    
    processhtml: {
        dist: {
            files: {
                "<%= htmlDistFile %>": ["<%= htmlSrcFile %>"]
            },
            options: {
                data: {
                    environment: "dist",
                    bundleMinJsFile: "<%= bundleMinJsFile %>",
                    bundleMinCssFile: "<%= bundleMinCssFile %>"
                }
            }
        }
    },
    copy: {
        dist: {
            files: [
	      {
                cwd: '<%= srcFolder %>',
                expand: true,
                src: ['fonts/*'],
                dest: '<%= distFolder %>'
             },

             {
                cwd: '<%= srcFolder %>',
                expand: true,
                src: ['node_modules/reflect-metadata/Reflect.js',
                    'node_modules/reflect-metadata/Reflect.js.map',
                    'node_modules/zone.js/dist/zone.js'
                     ],
                dest: '<%= distFolder %>',
                flatten: true
             },
             {
                cwd: '<%= srcFolder %>',
                expand: true,
                src: 'css/*',
                dest: '<%= distFolder %>'
             },
             {
                cwd: '<%= srcFolder %>',
                expand: true,
                src: 'app/**/*.html',
                dest: '<%= distFolder %>'
            }]
        }
    },
    browserify: {
        build: {
            files: {
                "<%= buildFolder %>/<%=bundleJsFile%>": ["<%= buildFolder %>/js/**/*.js"]
            },
            options: {
                browserifyOptions: {
                    debug: true
                }
            }
        }
    },
    exorcise: {
        build: {
            options: {},
            files: {
                '<%= buildFolder %>/<%= bundleJsMapFile %>': ['<%= buildFolder %>/<%=bundleJsFile%>'],
            }
        }
    },
    uglify: {
        dist: {
            files: {
                '<%= distFolder %>/<%=bundleMinJsFile%>': ["<%= buildFolder %>/<%=bundleJsFile%>"]
            }
        }
    }


  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-watch',
    'grunt-ts',
    'grunt-tslint',
    'grunt-processhtml',
    'grunt-contrib-copy',
    'grunt-browserify',
    'grunt-exorcise',
    'grunt-contrib-uglify'
  ].forEach((task) => grunt.loadNpmTasks(task));
  
  grunt.registerTask('build-dev', ['clean:build', 'tslint', 'ts']);
  
  grunt.registerTask('build-dist', ['clean:build', 'clean:dist', 'processhtml:dist', 'copy:dist', 'tslint', 'ts', 'browserify:build', 'exorcise:build', 'uglify:dist']);

};
