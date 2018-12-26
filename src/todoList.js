import React, { Component } from 'react';
import TodoItem from './todoItem';
import firebase from 'firebase';
import { hot } from "react-hot-loader";

let db = firebase.database().ref('todos/');
class TodoList extends Component {
  state = {};

  componentDidMount() {
    db.on('value', snap => {
      let todos = [];
      snap.forEach(child => {
        todos.push(child.val());
      });
      this.setState({ todos });
    });
  }

  add = () => {
    let newKey = db.push().key;
    db.update({
      [newKey]: {
        _id: newKey,
        createdAt: new Date()
      }
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  render() {
    const { params } = this.props;
    const { todos } = this.state;
    return (
      <div style={{flex:'1 1 auto', display:'flex', flexDirection:'column', padding:'0 50px'}}>
        <div style={{display:'flex', alignItems:'center'}}>
          <h1 style={{flex:'0 0 auto', marginRight:'10px'}}>Todos</h1>
          <div style={{fontSize:'24px', cursor:'pointer', color:'green'}} onClick={this.add}>+</div>
        </div>
        <div style={{flex:'1 1 auto', overflow:'auto'}}>
          {(todos || []).map((t, ti) => <TodoItem key={t._id} t={t} ti={ti} />)}
        </div>
      </div>
    )
  }
}
export default hot(module)(TodoList);