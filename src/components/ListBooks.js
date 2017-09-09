import React from 'react';
import Select from 'react-select';

function ListBooks(props){
    let {books} = props;
    const {onUpdateBookShelf} = props;

    const selectOptions = [{label: 'Move to...', value:'moveto', disabled: true},
      {label:'Currently Reading',value: 'currentlyReading'},
      {label:'Want to Read',value: 'wantToRead'},
      {label:'Read',value: 'read'},
      {label:'None',value: 'none'}];

    // Normalize books attributes
    if(!!books && books.length > 0){
      for (const element of books){
        // Normalize thumbnails
        if(!element.imageLinks || !element.imageLinks.thumbnail){
          element.imageLinks = {thumbnail: ''};
        }

        // Normalize authors
        if(!element.authors){
          element.authors = [];
        }
      }
    }else{
      books = [];
    }

    return(
      <div>
          <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <Select options={selectOptions} onChange={(event) => onUpdateBookShelf(book, event.value)}
                          className="book-shelf-select" searchable={false} placeholder={false}
                          value={book.shelf ? book.shelf : 'none'}/>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                        	{book.authors.join(', ')}
                        </div>
                  </div>
                </li>
              ))}
          </ol>
      </div>
    )
}
export default ListBooks;
