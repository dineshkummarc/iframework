/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n'+
        '*/'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>', 
          // Libs
          'libs/jquery.hotkeys.js',
          'libs/underscore.js',
          'libs/backbone.js',
          // Iframework
          'src/iframework.js',
          'src/graph.js',
          'src/graph-view.js',
          'src/node.js',
          'src/node-view.js',
          'src/node-box.js',
          'src/node-box-view.js',
          'src/node-box-iframe.js',
          'src/node-box-iframe-view.js',
          'src/port.js',
          'src/port-view.js',
          'src/module.js',
          'src/module-view.js',
          'src/edge.js',
          'src/edge-view.js',
          'src/router.js',
          'src/eventshistory.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: '<config:concat.dist.src>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      files: '<config:concat.dist.src>',
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
