import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftLogo from './component/LeftLogo';
import RightTabs from './component/RightTabs';
import TableData from './component/TableData';
import NavBar from './component/NavBar';
import { topGainer, topLoser } from './mock/data';
import io from 'socket.io-client';
injectTapEventPlugin();
const socket = io.connect('http://localhost:3333');

class App extends Component {
  constructor(props){
    super(props);
    this.onGainerClick = this.onGainerClick.bind(this);
    this.onLoserClick = this.onLoserClick.bind(this);
    this.state = {
      tab: 'GAINER',
      displayMap: topGainer
    }

  }

  componentDidMount() {
    socket.on('event', msg => {
      console.log(msg);
      const data = msg.sort((a, b) => b.value - a.value);
      let displayMap;
      if (this.state.tab === 'GAINER') {
        displayMap = data.slice(0, 20);
      } else {
        displayMap = data.slice(-20);
      }
      this.setState({
        data: msg,
        displayMap
      });
    });
  }
  

  onGainerClick() {
    this.setState({
      tab: 'GAINER',
      displayMap: this.state.data.slice(0, 20)
    });
  }

  onLoserClick() {
    this.setState({
      tab: 'LOSER',
      displayMap: this.state.data.slice(-20)
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

const Wrapper = () => {
  return (
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  )
}

export default Wrapper;
