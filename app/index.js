'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StbaseGenerator = module.exports = function StbaseGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StbaseGenerator, yeoman.generators.Base);

StbaseGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('-------------------------------------------------------------------------------------------');
  console.log('');
  console.log('  This generator includes: HTML5 Boilerplate, Normalize, jQuery and Modernizr by default,');
  console.log('  you may change these defaults after naming your project.');
  console.log('');
  console.log('-------------------------------------------------------------------------------------------');
  console.log('');
  console.log('  It also assumes you have SASS & Compass installed.');
  console.log('');
  console.log('-------------------------------------------------------------------------------------------');

  var prompts =
  [
    {
      name: 'projectAuthor',
      message: 'Who is working on this project?',
      default: 'Stuart Trann'
    },
    {
      name: 'projectAuthorTwitter',
      message: 'What is your twitter account?',
      default: 'estwo'
    },
    {
      name: 'projectName',
      message: 'What do you want to name this project?'
    },
    {
      type: 'checkbox',
      name: 'projectOptions',
      message: 'Choose to include the following in this project:',
      choices:
      [
        {
          name: 'HTML5 Boilerplate',
          value: 'optionH5BP',
          checked: true
        },
        {
          name: 'Normalize CSS',
          value: 'optionNormalize',
          checked: true
        },
        {
          name: 'jQuery 1.x',
          value: 'optionJquery1x',
          checked: true
        },
        {
          name: 'jQuery 2.x',
          value: 'optionJquery2x',
          checked: false
        },
        {
          name: 'Modernizr',
          value: 'optionModernizr',
          checked: true
        },
        {
          name: 'Compass Twitter Bootstrap',
          value: 'optionCompassBootstrap',
          checked: false
        },
        {
          name: 'RequireJS',
          value: 'optionRequireJS',
          checked: false
        },
        {
          name: 'Jekyll',
          value: 'optionJekyll',
          checked: false
        },
        {
          name: 'PHP',
          value: 'optionPhp',
          checked: false
        }
      ]
    }
  ];

  this.prompt(prompts, function (answers) {
    this.projectAuthor = answers.projectAuthor;
    this.projectAuthorTwitter = answers.projectAuthorTwitter;
    this.projectName = answers.projectName;

    var projectOptions = answers.projectOptions;

    this.optionH5bp = projectOptions.indexOf('optionH5bp') !== -1;
    this.optionNormalize = projectOptions.indexOf('optionNormalize') !== -1;
    this.optionJquery2x = projectOptions.indexOf('optionJquery2x') !== -1;
    this.optionJquery1x = projectOptions.indexOf('optionJquery1x') !== -1;
    this.optionModernizr = projectOptions.indexOf('optionModernizr') !== -1;
    this.optionCompassBootstrap = projectOptions.indexOf('optionCompassBootstrap') !== -1;
    this.optionRequireJS = projectOptions.indexOf('optionRequireJS') !== -1;
    this.optionJekyll = projectOptions.indexOf('optionJekyll') !== -1;
    this.optionPhp = projectOptions.indexOf('optionPhp') !== -1;

    cb();
  }.bind(this));
};

StbaseGenerator.prototype.app = function app() {
  this.mkdir('scss');
  this.mkdir('css');
  this.mkdir('js');
  this.mkdir('images');

  if(this.optionJekyll)
  {
    this.mkdir('_drafts');
    this.mkdir('_includes');
    this.mkdir('_layouts');
    this.mkdir('_posts');
    this.mkdir('_site');
  }

  if(this.optionPhp)
  {
    this.template('_index.php', 'index.php');
  }
  else
  {
    this.template('_index.html', 'index.html');
  }

  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

StbaseGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'favicon.ico');
  this.copy('404.html', '404.html');
  this.copy('robots.txt', 'robots.txt');
  this.copy('htaccess', '.htaccess');

  this.template('_humans.txt', 'humans.txt');
};

StbaseGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  // sublime project file
};

StbaseGenerator.prototype.runtime = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
