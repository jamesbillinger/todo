import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import firebase from "firebase/app";

global.firebaseApp = firebase.initializeApp(firebaseConfig);

let TodoList = React.lazy(() => import("./todoList"));
class Root extends Component {
  render() {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/todo/:id?"
              render={props => (
                <Suspense fallback={<div>Loading</div>}>
                  <TodoList {...props} />
                </Suspense>
              )}
            />
            <Route
              path="/"
              render={() => (
                <div>
                  <Link to="/todo">Todos</Link>
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const target = document.getElementById("root");
ReactDOM.render(<Root />, target);
