import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBook from './components/SearchBook';
import ListBooks from './components/ListBooks'
class BooksApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: true
    }

    this.changeScreen = this.changeScreen.bind(this);
  }

  filterBooksByShelf = function(filter, list){
    return list.filter((book) => book.shelf === filter);
  }

  filterBooks = function(books){
    const currentlyReading = this.filterBooksByShelf('currentlyReading', books);
    const wantToRead = this.filterBooksByShelf('wantToRead', books);
    const read = this.filterBooksByShelf('read', books);

    this.setState({currentlyReading, wantToRead, read});
  }

  componentDidMount = function(){
    BooksAPI.getAll().then((books) => this.filterBooks(books));
  }

  changeScreen = function() {
    this.setState((state) => ({showSearchPage: !this.state.showSearchPage}));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook onChangeScreen={this.changeScreen}/>
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
                    <ListBooks books={this.state.currentlyReading}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.wantToRead}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.read}/>
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
