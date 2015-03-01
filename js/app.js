(function ($) {
  var Book = Backbone.Model.extend({
    defaults: {
      coverImage: "img/placeholder.png",
      title: "Some Title",
      author: "John Doe",
      releaseDate: "2012",
      keywords: "JavaScript Programming"
    }
  });

  var BookView = Backbone.View.extend({
    tagName: "div",
    className: "bookContainer",
    template: $("#bookTemplate").html(),

    render: function() {
      var tmpl = _.template(this.template);  // tmpl is a function that takes a JSON object and returns html

      this.$el.html(tmpl(this.model.toJSON()));  // this.el is what we define in tagName.  Use $el to get access to jQuery html() function
      return this;
    }
  });

  var book = new Book({
    title: "Some title",
    author: "John Doe",
    releaseDate: "2012",
    keywords: "JavaScript Programming"
  });

  var bookView = new BookView({
    model: book
  });

  $("#books").html(bookView.render().el);
}) (jQuery);