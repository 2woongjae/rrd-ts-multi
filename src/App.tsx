import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink as Link,
  RouteComponentProps
} from 'react-router-dom';
import './App.css';

const Links = () => (
  <div>
    <Link exact={true} activeClassName="selected" to="/">
      Home
    </Link>
    <Link
      activeStyle={{ color: 'crimson', fontWeight: 'bold' }}
      to={{ pathname: '/hello/' }}
    >
      Hello
    </Link>
    <Link exact={true} activeClassName="selected" replace={true} to="/world">
      World
    </Link>
    <Link activeClassName="selected" to="/world/Mark">
      World/Mark
    </Link>
    <Link activeClassName="selected" to="/children">
      children
    </Link>
  </div>
);

const Home = (props: RouteComponentProps<{}>) => {
  console.log(props.match, props.location);
  console.log(new URLSearchParams(props.location.search).get('name') || '없음');
  return <h2>Home</h2>;
};
const Hello = () => <h2>Hello</h2>;

const Top = () => (
  <div>
    <Route exact={true} path="/world" render={() => <h2>Top</h2>} />
    <Route exact={true} path="/" component={Home} />
    <Route strict={true} path="/hello/" component={Hello} />
    <Route
      path="/world/:name"
      render={(props: RouteComponentProps<{ name: string }>) => {
        console.log(props.match.params.name);
        return <h2>{props.match.params.name}</h2>;
      }}
    />
    <Route
      path="/children"
      children={(props: RouteComponentProps<{}>) => {
        return props.match && <h2>{JSON.stringify(props.match)}</h2>;
      }}
    />
  </div>
);

const Bottom = () => (
  <div>
    <Route exact={true} path="/world" render={() => <h2>Bottom</h2>} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Links />
          <Top />
          <Bottom />
        </div>
      </Router>
    );
  }
}

export default App;
