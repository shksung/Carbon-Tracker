
import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import Day from './components/Day.js'


class App extends Component {
  
  state= {
    dailyConsumptionArray: [],
    valueID: 0
  }

  grabValue = (value)=> {
    this.setState ({
      valueID:value
    })
  }

  pushArray =(arr) => {
    this.setState ({
      dailyConsumptionArray: this.state.dailyConsumptionArray.concat(arr)
    })
  }
  render() {
    return (
      <div className="App">
       
        <Switch>
        <Route exact path="/" render={() => <Home grabValue= {this.grabValue} />} > </Route>
        <Route path="/:day" render={() => <Day valueID= {this.state.valueID} pushArray= {this.pushArray} />} > </Route>
        </Switch>

      </div>
    );
  }
}

class Home extends Component {
  state = {
    date: new Date(),
    day: "",
    month: "",
    value: 0
  }

  dateClick = (date) => {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    this.setState({
      date: date,
      value: String(day) + "-" +String (monthIndex)+ "-" + String(year)
    }, ()=>{this.props.grabValue(this.state.value)} )
  }
  render () {
    return (
      <div>
      <div>
      <Calendar
        onChange={this.dateClick}
        value={this.state.date}
      /> 
    </div>
    <div>
      <Link to={"/" + String(this.state.value)}><div className= "left"><button>Go</button></div></Link>
    </div>
    </div>
    )
  }
}



export default App;
