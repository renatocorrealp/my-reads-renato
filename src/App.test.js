import React from 'react'
import MockRouter from 'react-mock-router';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router';
import BooksApp from './App'
import { shallow, mount, render } from "enzyme";
import {BrowserRouter} from 'react-router-dom';
import {Route}from 'react-router-dom';
import Select from 'react-select';
import BooksShelf from './components/Shelf';
import * as BooksAPI from './BooksAPI'
import SearchBook from './components/SearchBook';
/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

/*
it('renders without crashing', () => {
  shallow(<BrowserRouter><App /></BrowserRouter>)
}) */

/*
it("Move book", async () => {



  const test = await mount(
    <MemoryRouter initialEntries={[ '/search', '/' ]} initialIndex={1}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MemoryRouter>, { lifecycleExperimental: true }
  );

  await BooksAPI.getAll();

  const application = test

  // await test.find(App).node.state.books[1]
  // console.log('books:' + test.find(App).node.state.books.length);

  expect(application.find('#searchBookComponent')).toHaveLength(0);

  const shelfOfBooks = application.find('#shelfOfBooks')
  expect(shelfOfBooks).toHaveLength(1);

  const currentlyReading = application.find('#shelfCurrentlyReading');
  expect(currentlyReading).toHaveLength(1);

  expect(application.find('#shelfCurrentlyReading').find('ol')).toHaveLength(5);
  test.unmount();
}); */

it("Move book", async () => {
  const books = await BooksAPI.getAll();

  const shelf = await mount(
    <MockRouter url='/' location='/search'>
        <BooksApp books={books}/>
    </MockRouter>
  );
    await shelf.setState({books});
    //const booksReading = shelf.find('#shelfOfBooks #shelfCurrentlyReading ol');
    console.log(shelf.html());
    // expect(booksReading.childAt(0).find(Select)).toHaveLength(1);
  // booksReading.childAt(0).find(Select).simulate('change', {target: {name: "wantToRead", value: "wantToRead"}})
});
