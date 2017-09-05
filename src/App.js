import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBook from './components/SearchBook';
import ListBooks from './components/ListBooks'
class BooksApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: [],

      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: true
    }

    this.changeScreen = this.changeScreen.bind(this);
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  updateBookShelf = function(updateBook, shelf){
    const {books} = this.state;
    for (let book of books){
      if(updateBook.id === book.id){
        updateBook.shelf = shelf;
        break;
      }
    }
    this.setState({books});
    BooksAPI.update(updateBook, shelf);
  }

  filterBooksByShelf = function(filter){
    return this.state.books.filter((book) => book.shelf === filter);
  }


  componentDidMount = function(){
    BooksAPI.getAll().then((books) => this.setState({books}));
  }

  changeScreen = function() {
    this.setState((state) => ({showSearchPage: !this.state.showSearchPage}));
  }

  render() {
    const currentlyReading = this.filterBooksByShelf('currentlyReading');
    const wantToRead = this.filterBooksByShelf('wantToRead');
    const read = this.filterBooksByShelf('read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook onChangeScreen={this.changeScreen} booksShelved={this.state.books}/>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
