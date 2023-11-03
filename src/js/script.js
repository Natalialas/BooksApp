/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  
  
  const booksList = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  
  function render(){
    for(let book of dataSource.books){
      const generatedHTML = booksTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);   
    }
  }
  
  render();
  
  const favoriteBooks = [];
  
  function initActions(){
    const bookImages = booksList.querySelectorAll('.book__image');
  
    for(let bookImage of bookImages){
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.add('favorite');
        const bookId = bookImage.getAttribute('data-id');
        favoriteBooks.push(bookId);
        // console.log(bookImage);
        // console.log(favoriteBooks);
      });
    }
  }
  
  initActions();
}