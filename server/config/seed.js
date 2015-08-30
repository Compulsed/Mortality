/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Mortality = require('../api/mortality/mortality.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

// {
//   dateAdded: Date,
//   name: String,
//   inputDate: Date
//   daysAlive: Date
// }
Mortality.find({}).remove(function() {
  Mortality.create({
    dateAdded: new Date(),
    name: "#1 Test Name",
    lastName: "#1 Last name",
    inputDate: new Date(),
    daysAlive: 10000
  }, {
    dateAdded: new Date(),
    name: "#2 Test Name",
    lastName: "#2 Last name",
    inputDate: new Date(),
    daysAlive: 10000
  }, {
    dateAdded: new Date(),
    name: "#3 Test Name",
    lastName: "#3 Last name",
    inputDate: new Date(),
    daysAlive: 10000
  },
  // Old Data that needs migrating
  {
    dateAdded: new Date(),
    name: "#4 Old Name",
    inputDate: new Date(),
    daysAlive: 10000
  }, {
      dateAdded: new Date(),
      name: "#5 Old Name",
      inputDate: new Date(),
      daysAlive: 10000
  });
});
