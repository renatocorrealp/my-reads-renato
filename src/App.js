import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBook from './components/SearchBook';
import ListBooks from './components/ListBooks';
import {Link} from 'react-router-dom';
import {Route}from 'react-router-dom';
class BooksApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: []
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  updateBookShelf = (updateBook, shelf) => {
    this.setState(prev => {
      const {books} = prev;
      let bookShelved = books.find((element) => element.id === updateBook.id);

      if(bookShelved){
        bookShelved.shelf = shelf;
      }else{
        updateBook.shelf = shelf;
        books.push(updateBook);
      }
    });
    BooksAPI.update(updateBook, shelf);
  }

  /*filterBooksByShelf = function(filter){
    return this.state.books.filter((book) => book.shelf === filter);
  }*/

  filterBooksByShelf = filter => this.state.books.filter((book) => book.shelf === filter);

  componentDidMount = () => BooksAPI.getAll().then((books) => this.setState({books}));

  render() {
    const currentlyReading = this.filterBooksByShelf('currentlyReading');
    const wantToRead = this.filterBooksByShelf('wantToRead');
    const read = this.filterBooksByShelf('read');

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook booksShelved={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={currentlyReading} onUpdateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={wantToRead} onUpdateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={read} onUpdateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
