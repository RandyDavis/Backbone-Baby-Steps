(function ($) {
  // $("#releaseDate").datepicker();

  var books = [
    { title: "JS The Good Parts", author: "John Doe", releaseDate: "2012", keywords: "JavaScript Programming" },
    { title: "CS The Better Parts", author: "John Doe", releaseDate: "2012", keywords: "CoffeeScript Programming" },
    { title: "Scala for the Impatient", author: "John Doe", releaseDate: "2012", keywords: "Scala Programming" },
    { title: "American Psycho", author: "Brett Easton Ellis", releaseDate: "2012", keywords: "Novel Splatter" },
    { title: "Eloquent JavaScript", author: "John Doe", releaseDate: "2012", keywords: "JavaScript Programming" }
  ];

  var Book = Backbone.Model.extend({
    defaults: {
      coverImage: "img/placeholder.png",
      title: "No Title",
      author: "Unknown",
      releaseDate: "Unknown",
      keywords: "None"
    },
    // parse: function(response) {
    //   console.log(response);
    //   response.id = response._id;
    //   return response;
    // }
    idAttribute: "_id"
  });


  var Library = Backbone.Collection.extend({
    model: Book,
    url: '/api/books'
  });

  var BookView = Backbone.View.extend({
    tagName: "div",
    className: "bookContainer",
    template: $("#bookTemplate").html(),

    render: function() {
      var tmpl = _.template(this.template);  // tmpl is a function that takes a JSON object and returns html

      this.$el.html(tmpl(this.model.toJSON()));  // this.el is what we define in tagName.  Use $el to get access to jQuery html() function
      return this;
    },

    events: {
      "click .delete": "deleteBook"
    },

    deleteBook: function() {
      // Delete Model
      this.model.destroy();

      // Delete View
      this.remove();
    }
  });


  var LibraryView = Backbone.View.extend({
    el: $("#books"),

    initialize: function() {
      // this.collection = new Library(books);
      this.collection = new Library();
      this.collection.fetch();
      this.render();

      this.collection.on("add", this.renderBook, this);
      this.collection.on("remove", this.removeBook, this);
      this.collection.on("reset", this.render, this);
    },
    
    render: function() {
      var self = this;
      _.each(this.collection.models, function(item) {
        self.renderBook(item);
      });
    },

    events: {
      "click #add": "addBook"
    },
    
    addBook: function(e) {
      e.preventDefault();

      var formData = {};

      $("#addBook div").children("input").each(function(i, el) {
        // Check to see if a value exists for the element we want, if not, defaults will be used
        if($(el).val() !== "") {
          if (el.id === 'keywords') {
            var keywordArray = $(el).val().split(', ');
            var keywordObjects = [];
            for (var j = 0; j < keywordArray.length; j++) {
              keywordObjects[j] = {"keword":keywordArray[j]};
            }
            formData[el.id] = keywordObjects;
          }
          else if(el.id === 'releaseDate') {
            formData[el.id] = $('#releaseDate').datepicker("getDate").getTime();
          } else {
            formData[el.id] = $(el).val();
          }
        }
      });

      books.push(formData);

      // this.collection.add(new Book(formData));
      // Update above new book to "create" a book to persist on the sever
      this.collection.create(formData);
    },

    renderBook: function(item) {
      var bookView = new BookView({
        model: item
      });
      this.$el.append(bookView.render().el);
    },

    removeBook: function(removedBook) {
      var removedBookData = removedBook.attributes;

      _.each(removedBookData, function(val, key) {
        if(removedBookData[key] === removedBook.defaults[key]) {
          delete removedBookData[key];
        }
      });

      _.each(books, function(book) {
        if(_.isEqual(book, removedBookData)) {
          books.splice(_.indexOf(books, book), 1);
        }
      });
    }
  });




  var libraryView = new LibraryView();
}) (jQuery);