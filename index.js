var http = require('http');
var express = require('express');
var RED = require('node-red');

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use('/', express.static('public'));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  httpAdminRoot: '/red',
  httpNodeRoot: '/api',
  userDir: './user-data',
  flowFile: './user-data/flows_default.json',
  functionGlobalContext: {},
  adminAuth: true,
  adminAuth: {
    type: 'credentials',
    users: [
      {
        username: 'admin',
        password:
          '$2b$08$XM8kY9EJt9.cRMnKYN2EAO3ZjgF9RAJxTRD3LqTuIQx6.nasz0GSy',
        permissions: '*',
      },
      {
        username: 'user',
        password:
          '$2b$08$eNUDlK/l5BlzU1kFHQR7aucyP.NMy839p79ap9dCpOVrdShf2kiSK',
        permissions: 'read',
      },
    ],
    default: {
      permissions: 'read',
    },
  },
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

const port = process.env.PORT || 1337;
server.listen(port);

// Start the runtime
RED.start();
