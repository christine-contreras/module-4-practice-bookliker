import React, { Component } from 'react'
import {
    Container,
    Header,
    Button,
    List,
    Image
  } from "semantic-ui-react"



export class Book extends Component {
    

    render() {
        return (
            <Container text>
            <Header>{this.props.book.title}</Header>
            <Image
                src={this.props.book.img_url}
                size="small"
            />
            <p>{this.props.book.description}</p>
            <Button
                onClick={() => this.props.handleLikeClick(this.props.book)}
                color="red"
                content="Like"
                icon="heart"
                label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: this.props.book.users.length
                }}
            />
            <Header>Liked by</Header>
            <List>
                {this.props.book.users.map(user => <List.Item key={user.id} icon="user" content={user.username} />)}
            </List>
            </Container>
        )
    }
}

export default Book