import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBook from './components/SearchBook';
import BooksShelf from './components/Shelf';
import {Route}from 'react-router-dom';
class BooksApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      books: []
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  // Updates book shelf
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

  // Calls API to get books in shelf
  componentDidMount = () => BooksAPI.getAll().then((books) => this.setState({books}));

  render() {
    const {books} = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBook
              booksShelved={books}
              onUpdateBookShelf={this.updateBookShelf}/>
          )}
        />
      <Route
        exact
        path="/"
        render={() => (
          <BooksShelf
            updateBookShelf={this.updateBookShelf}
            books={books}/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
