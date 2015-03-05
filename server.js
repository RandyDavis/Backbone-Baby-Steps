// Module dependencies
var application_root = __dirname,
    express = require("express"), // Web framework
    path = require("path"), // Utilities for dealing with file paths
    mongoose = require('mongoose'); // MongoDB integration

// Create server 
var app = express.createServer();

// Configure server 
app.configure(function() {
  app.use(express.bodyParser()); // parses request body and populates req. body
  app.use(express.methodOverride()); // checks req.body for HTTP method overrides
  app.use(app.router); // perform route lookup based on url and HTTP method
  app.use(express.static(path.join(application_root, "public"))); // Where to serve static content
  app.use(express.errorHandler({ dumpExceptions:true, showStack:true })); // Show all errors in development
});

// Start server 
app.listen(4711, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

// Routes
app.get('/api', function(req, res) {
  res.send('Library API is running');
});

// Connect to database
mongoose.connect('mongodb://localhost/library_database');

// Schemas
var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

// Models
var BookModel = mongoose.model('Book', Book);

