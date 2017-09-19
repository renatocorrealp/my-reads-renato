import React, {Component} from 'react';
import ListBooks from './ListBooks';
import {Link} from 'react-router-dom';
class BooksShelf extends Component {

  // Filters book's by shelf status
  filterBooksByShelf = (filter) => this.props.books.filter((book) => book.shelf === filter);

  render() {
    const currentlyReading = this.filterBooksByShelf('currentlyReading');
    const wantToRead = this.filterBooksByShelf('wantToRead');
    const read = this.filterBooksByShelf('read');
    const {updateBookShelf} = this.props;

    return (
      <div className="list-books" id="shelfOfBooks">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div
              id="shelfCurrentlyReading"
              className="bookshelf">
              <h2 className="bookshelf-title">
                Currently Reading
              </h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={currentlyReading}
                  onUpdateBookShelf={updateBookShelf}/>
              </div>
            </div>
            <div id="shelfWantToRead" className="bookshelf">
              <h2 className="bookshelf-title">
                Want to Read
              </h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={wantToRead}
                  onUpdateBookShelf={updateBookShelf}/>
              </div>
            </div>
            <div id="shelfRead" className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ListBooks
                  books={read}
                  onUpdateBookShelf={updateBookShelf}/>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default BooksShelf
