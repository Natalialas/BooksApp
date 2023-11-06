/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  
  const select = {
    listOfBooks: '.books-list',
    form: '.filters',
    bookTemplate: '#template-book',
  };
  
  const templates = {bookTemplate: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML)};

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }
  
    initData() {
      const thisBooksList = this;

      this.data = dataSource.books;
    }

    render() {
      const thisBooksList = this;
      for (let book of thisBooksList.data) {
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.dom.booksList.appendChild(generatedDOM);
      }
    }
  
    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.dom.booksList = document.querySelector(select.listOfBooks);
      thisBooksList.dom.form = document.querySelector(select.form);
    }
  
    initActions() {
      const thisBooksList = this;
      thisBooksList.dom.booksList.addEventListener('dblclick', function (event) {
        const clickedBook = event.target.closest('a');
        event.preventDefault();
        let bookId = clickedBook.getAttribute('data-id');
        if (!thisBooksList.favoriteBooks.includes(bookId)) {
          clickedBook.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
        } else {
          const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(indexOfBook, 1);
          clickedBook.classList.remove('favorite');
        }
      });
      thisBooksList.dom.form.addEventListener('click', function (event) {
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          console.log(event.target.value);
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
          } else {
            const indexOfFilter = thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(indexOfFilter, 1);
          }
        }
        console.log('filters', thisBooksList.filters);
        thisBooksList.filterBooks();
      });
    }
  
    filterBooks() {
      const thisBooksList = this;
      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden) {
          filteredBook.classList.add('hidden');
        } else {
          filteredBook.classList.remove('hidden');
        }
      }
    }
  
    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  
  }
  
  const app = new BooksList();
  console.log(app);
}