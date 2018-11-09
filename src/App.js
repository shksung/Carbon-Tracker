
import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import Day from './components/Day.js'
import { Line } from 'react-chartjs-2';
import {Carousel} from "react-responsive-carousel"




class App extends Component {

  state = {
    dailyConsumptionArray: [],
    numbersArray: [],
    filteredArray: [],
    datesArray: [],
    filteredDates: [],
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
      filteredArray: this.state.numbersArray.concat(arr),
      datesArray: this.state.datesArray.concat(date),
      filteredDates:this.state.datesArray.concat(date)
    })
  }


  filteredArray = (ID, number) => {
    let index
    for (let i = 0; i < this.state.dailyConsumptionArray.length; i++) {
      if (this.state.dailyConsumptionArray[i].ID === ID) {
        index = i
      }
    }
    let newObject = this.state.dailyConsumptionArray.splice(index, number)
    let newArray = []
    let filteredDates =[]
    for (let i = 0; i < newObject.length; i++) {
      newArray = newArray.concat(newObject[i].total)
      filteredDates= newArray.concat(newObject[i].ID)
    }
   

    this.setState({
      filteredArray: newArray,
      filteredDates: filteredDates
    })
  }

  render() {


    return (
      <div >
        <div>
          <nav>
            <Link to='/'>Carbon Calender</Link>
            <Link to='/global/data'>Global Carbon</Link>
            <Link to='/landingpage'>Landing Page</Link>
          </nav>


        </div>

        <Switch>
          <Route exact path="/" render={() => <Home filteredArray={this.filteredArray} filtered={this.state.filteredArray} datesArray={this.state.datesArray} valueID={this.state.valueID} numbersArray={this.state.numbersArray} grabValue={this.grabValue} />} />
          <Route exact path="/:day" render={() => <Day valueID={this.state.valueID} pushArray={this.pushArray} />} />
          <Route path="/global/data" component={GlobalData} />
          <Route path='/go/landingpage' render={() => <LandingPage />}></Route>
        </Switch>
      </div>
    );
  }
}

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel autoPlay={true} infiniteLoop={true}>
          <div>
            <img src="AK47.jpg" />

          </div>
          <div>
            <img src="img1.jpg" />

          </div>
          <div>
            <img src="nintendo.jpg" />

          </div>
        </Carousel>
      </div>
    )
  }
}

class Home extends Component {
  state = {
    date: new Date(),
    day: "",
    month: "",
    value: 0,
    ID: 0,
    number: 0
  }

  dateClick = (date) => {
    var day = date.getDate();
    var monthIndex = date.getMonth() +1;
    var year = date.getFullYear();

    
    this.setState({
      date: date,
      value: String(monthIndex) + "-" + String(day) + "-" + String(year)
    }, () => { this.props.grabValue(this.state.value) })
  }

  dateInput = (e) => {
    this.setState({
      ID: e.target.value
    })
  }

  numberInput = (e) => {
    this.setState({
      number: e.target.value
    })
  }
  render() {
    const data = {
      labels: this.props.filteredDates,
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
          data: this.props.filtered
        }
      ]
    }

    return (
      <div>
        <div>
          <h1 className="App">Carbon Calendar</h1>
          <div className="App">
            <Calendar
              className="App"
              onChange={this.dateClick}
              value={this.state.date}

            />

          </div>
          Start   <input onChange={this.dateInput} />
          Day Range  <input onChange={this.numberInput} />  <button onClick={()=>this.props.filteredArray(this.state.ID, this.state.number)}>Submit</button>
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



class GlobalData extends Component {
  render() {
    return (
      <div className="App">
        <h2>Total World Energy Consumption, projection to 2050</h2>
        <p>*Click on map to see the detailed data*</p>
        <iframe id="eia_widget" width='70%' height='500' title='a' src="//www.eia.gov/opendata/embed/iframe.php?series_id=IEO.2017.HIGHMACRO.CNSM_PE_WOR_QBTU.A" load="iframe_load"></iframe>
        <h2>Total Energy Consumption, by state</h2>
        <p>*Click on map to select the state for comparison*</p>
        <iframe id="eia_widget" width='70%' height='500' title='b' src="//www.eia.gov/opendata/embed/iframe.php?geoset_id=SEDS.TETCB.A&map=us_merc_en&regions=USA-CA&relation_mode=line" ></iframe>
        <h2>CO2 Emissions by type of fuels</h2>
        <p>*Click on map to select the state for comparison*</p>
        <iframe id="eia_widget" width='70%' height='500' title='c' src="//www.eia.gov/opendata/embed/iframe.php?geoset_id=EMISS.CO2-TOTV-TT-TO.A&map=us_merc_en&regions=USA-CA&relation_mode=line" ></iframe>
        <iframe id="eia_widget" width='70%' height='500' title='d' src="//www.eia.gov/opendata/embed/iframe.php?geoset_id=EMISS.CO2-TOTV-RC-TO.A&map=us_merc_en&regions=USA-CA&relation_mode=line" ></iframe>
        <iframe id="eia_widget" width='70%' height='500' title='e' src="//www.eia.gov/opendata/embed/iframe.php?geoset_id=EMISS.CO2-TOTV-TC-TO.A&map=us_merc_en&regions=USA-CA&relation_mode=line" ></iframe>

      </div>
    );
  }
}




export default App;
