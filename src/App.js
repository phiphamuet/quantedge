import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';

import './App.css';
import LeftLogo from './component/LeftLogo';
import RightTabs from './component/RightTabs';
import TableData from './component/TableData';
import NavBar from './component/NavBar';
// import { topGainer, topLoser } from './mock/data';

injectTapEventPlugin();
const socket = io.connect('http://localhost:3333');

class App extends Component {
  constructor(props) {
    super(props);
    this.onGainerClick = this.onGainerClick.bind(this);
    this.onLoserClick = this.onLoserClick.bind(this);
    this.state = {
      tab: 'GAINER',
      displayMap: [],
    };
  }

  componentDidMount() {
    socket.on('event', (msg) => {
      const {
        loser,
        gainer,
      } = msg;
      let displayMap;
      if (this.state.tab === 'GAINER') {
        displayMap = gainer;
      } else {
        displayMap = loser;
      }
      this.setState({
        data: msg,
        displayMap,
      });
    });
  }

  onGainerClick() {
    this.setState({
      tab: 'GAINER',
      displayMap: this.state.data.gainer,
    });
  }

  onLoserClick() {
    this.setState({
      tab: 'LOSER',
      displayMap: this.state.data.loser,
    });
  }

  render() {
    const display = this.state.displayMap;
    return (
      <div className="App">
        <NavBar
          LeftLogo={LeftLogo}
          RightTabs={RightTabs}
          loserHandler={this.onLoserClick}
          gainerHandler={this.onGainerClick}
        />
        <TableData data={display} />
      </div>
    );
  }
}

const Wrapper = () =>
  (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );

export default Wrapper;
