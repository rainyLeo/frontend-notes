/* eslint no-redeclare: 'off', no-shadow: 'off' */



/* More Advanced Patterns (singleton pattern / module pattern) */
var Book = (function() {
  // Private static attributes
  var numOfBooks = 0;
  // Private static method
  function checkIsbn(isbn) {

  }

  // Return the constructor
  return function(newIsbn, newTitle) {
    // Private attributes
    var isbn, title;

    // Privileged methods
    this.getIsbn = function() {
      return isbn;
    };
    this.setIsbn = function(newIsbn) {
      if (!checkIsbn(newIsbn)) {
        throw new Error('Book: Invalid ISBN');
      }
      isbn = newIsbn;
    };
    this.getTitle = function() {
      return title;
    };
    this.setTitle = function(newTitle) {
      title = newTitle || 'No title specified';
    };

    // Constructor code
    numOfBooks++;
    if (numOfBooks > 50) {
        throw new Error('Book: Only 50 instances of Book can be created');
    }
    this.setIsbn(newIsbn);
    this.setTitle(newTitle);

};
})();

// Public static method
Book.convertToTitleCase = function(inputString) {

};
//Public, non-privileged methods
Book.prototype = {
  display: function() {

  }
};


/* Singleton with Private Members / Module Pattern*/
var MyNamespace = MyNamespace || {};
MyNamespace.Singleton = (function() {
  // Private members
  var privateAttribute1 = false;
  var privateAttribute2 = [1, 2, 3];

  function privateMethod1() {

  }
  function privateMethod2() {

  }

  // Everything returned in the object literal is public, but can access the
  // members in the closure created above.
  return {
    // Public members
    publicAttribute1: true,
    publicAttribute2: 10,

    publicMethod1: function() {
      var output = privateMethod1(); // call the private method by just using their names
    },
    publicMethod2: function() {

    }
  };
})(); // Invoke the function and assign the returned object literal to MyNamespace.Singleton
