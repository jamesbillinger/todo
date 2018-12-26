import React, { Component } from 'react';
import firebase from 'firebase';

export default class Todos extends Component {
  state = {
    text: this.props.t.text
  };
  db = firebase.database().ref(`todos`);

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (t.text !== prevProps.t.text) {
      this.setState({
        text: t.text
      });
    }
  }

  textChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  textBlur(e) {
    const { t } = this.props;
    this.db.update({
      [t._id]: Object.assign(t, {
        text: e.target.value
      })
    });
  }

  deleteTodo() {
    const { t } = this.props;
    this.db.child(t._id).remove();
  }

  toggleComplete() {
    const { t } = this.props;
    this.db.update({
      [t._id]: Object.assign(t, {
        complete: !t.complete
      })
    });
  }

  render() {
    const { t, ti } = this.props;
    const { text } = this.state;
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ color: '#bbb' }}>{ti + 1}</div>
        <div>
          <div
            style={{
              cursor: 'pointer',
              color: 'red',
              fontSize: '16px',
              margin: '0 5px'
            }}
            onClick={::this.deleteTodo}>
            X
          </div>
        </div>
        <div>
          <input value={text || ''} onChange={::this.textChange} onBlur={::this.textBlur} />
        </div>
        <div
          style={{
            margin: '0 5px',
            fontSize: '16px',
            color: 'blue',
            cursor: 'pointer'
          }}
          onClick={::this.toggleComplete}>
          ✓
        </div>
      </div>
    );
  }
}
