
import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import Day from './components/Day.js'
import { Line } from 'react-chartjs-2';




class App extends Component {

  state = {
    dailyConsumptionArray: [],
    numbersArray: [],
    datesArray: [],
    valueID: 0
  }

  grabValue = (value) => {
    this.setState({
      valueID: value
    })
  }

  pushArray = (obj, arr, date) => {
    this.setState({
      dailyConsumptionArray: this.state.dailyConsumptionArray.concat(obj),
      numbersArray: this.state.numbersArray.concat(arr),
      datesArray: this.state.datesArray.concat(date)
    })
  }
  render() {


    return (
      <div >
        <div>

        </div>

        <Switch>
          <Route exact path="/" render={() => <Home datesArray= {this.state.datesArray} valueID={this.state.valueID} numbersArray={this.state.numbersArray} grabValue={this.grabValue} />} > </Route>
          <Route path="/:day" render={() => <Day valueID={this.state.valueID} pushArray={this.pushArray} />} > </Route>
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
      value: String(monthIndex) + "-" + String(day) + "-" + String(year)
    }, () => { this.props.grabValue(this.state.value) })
  }
  render() {
    console.log(this.props.numbersArray)
    const data = {
      labels: this.props.datesArray,
      datasets: [
        {
          label: 'Carbon Emission',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.numbersArray
        }
      ]
    }

    return (
      <div>
        <div>
          <h1 className= "App">Carbon Calendar</h1>
          <div className= "App">
          <Calendar
            className= "App"
            onChange={this.dateClick}
            value={this.state.date}

          />
          </div>
          <Link to={"/" + String(this.state.value)}><div className="App"><button>Go</button></div></Link>
          <div>
            <div>
          <Line data={data}
            height={400}
            width={200}
            options={{
              maintainAspectRatio: false
            }} />
            </div>
            </div>
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}



export default App;
