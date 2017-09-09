import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import ListBooks from './ListBooks';
import {Link} from 'react-router-dom';

class SearchBook extends Component{
  constructor(props){
    super(props);
    this.state = {
      booksResult: []
    }
    this.timeout = null;
  }

  searchBook = query => {
    // Clear timeout if the user still typing
    clearTimeout(this.timeout);

    // Wait for user stop typing
    this.timeout = setTimeout(() => {
      if(!!query){
        BooksAPI.search(query, 10).then((booksResult) => {
          this.loadBooksShelves(booksResult);
          this.setState({booksResult});
        });
      }else{
        this.setState({booksResult: []});
      }
    }, 500);
  }

  loadBooksShelves = booksResult => {
    const {booksShelved} = this.props;

    if(!!booksResult && booksResult.length > 0){
       for(const book of booksResult) {
        const bookShelved = booksShelved.find((element) => element.id === book.id);
        if(bookShelved){
          book.shelf = bookShelved.shelf;
        }
      };
    }
  }

  render(){
    const {onUpdateBookShelf} = this.props;
    this.loadBooksShelves(this.state.booksResult);
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={(event) => this.searchBook(event.target.value)} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={this.state.booksResult} onUpdateBookShelf={onUpdateBookShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBook;
