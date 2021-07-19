import React, { Component } from 'react'
import {
  Menu,
} from "semantic-ui-react"
import Book from "./Book"



export class App extends Component {
  state = {
    books: [],
    selectedBook: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => {
      this.setState({ books })
    })
  }

  handleBookTitleClick = (book) => {
    this.setState({
      selectedBook: book,
    })
  }

  handleLikeClick = (book) => {
    const checkIfAlreadyLiked = this.state.selectedBook.users.find(user => user.id === 1)

    if(checkIfAlreadyLiked === undefined) {
        const formData = {
            users: [
              ...this.state.selectedBook.users,
                {
                    id: 1,
                    username: "pouros" 
                }
            ]
        }

        const dataConfig = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData)
        }

        fetch(`http://localhost:3000/books/${book.id}`, dataConfig)

        this.setState(prevState => {
          return {
            selectedBook: {
              ...prevState.selectedBook,
              users: [...prevState.selectedBook.users, {id: 1,username: "pouros" }]
            }
          }
        })

    } //if undefined 

}

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            {this.state.books.map(book => (
              <Menu.Item as={"a"} onClick={() => this.handleBookTitleClick(book)}>
                {book.title}
              </Menu.Item>

            ))}
          </Menu>
          {this.state.selectedBook.length !== 0 ?
          <Book
          book={this.state.selectedBook}
          handleLikeClick={this.handleLikeClick}
          /> 
          : null}
        </main>
      </div>  
    )
  }
}

export default App