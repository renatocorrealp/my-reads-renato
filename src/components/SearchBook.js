import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import ListBooks from './ListBooks'
class SearchBook extends Component{
  constructor(props){
    super(props);
    this.state = {
      booksResult: []
    }
  }

  searchBook = function(query){
    // TODO colocar delay para realizar busca
    // TODO verificar criteria
    if(!!query){
      BooksAPI.search(query, 10).then((booksResult) => this.setState({booksResult}));
    }
  }

  render(){
    const {onChangeScreen} = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={onChangeScreen}>Close</a>
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
          <ListBooks books={this.state.booksResult}/>
        </div>
      </div>
    )
  }
}

export default SearchBook;
