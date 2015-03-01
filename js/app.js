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
}) (jQuery);