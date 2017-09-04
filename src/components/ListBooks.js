import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
class ListBooks extends Component{

  render(){
    const {books} = this.props;
    const {onUpdateBookShelf} = this.props;
    return(
      <div>
        {(!!books && books.length > 0) && (
          <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue={(!!book.shelf ? book.shelf : 'none')} onChange={(event) => onUpdateBookShelf(book, event.target.value)}>
                          <option value="moveto" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead" >Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                        	{book.authors? book.authors.join(', ') : ''}
                        </div>
                  </div>
                </li>
              ))}
          </ol>
        )}
      </div>
    )
  }
}
export default ListBooks;
