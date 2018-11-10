import React, { Component } from 'react';

class Day extends Component {
    state = {
        travelMode: '',
        drivingMPD: 0,
        drivingMPG: 0,
        publicbusMPD: 0,
        time: 0,
        wattage: 0,
        total: 0,
        food: '',
        foodNumber: 0
    }

    
    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateResult = () => {
        const moveAround = this.state.travelMode
        let travelResult
        let heatingResult
        let foodResult
        let total

        switch (moveAround) {
            case 'drive':
                let gallons = this.state.drivingMPD / this.state.drivingMPG
                travelResult = gallons * 10.4

                break;

            case 'publicbus':
                let busgallons = this.state.drivingMPD / 38.3
                travelResult = busgallons * 10.4

                break;

            default:
                travelResult = 0
        }
        let kwh = this.state.wattage * this.state.time
        heatingResult = kwh * 0.264

        foodResult = this.state.foodNumber * 4.7

        total = heatingResult + travelResult + foodResult


        this.setState({
            total: total
        } , ()=> { 
            let arr= total
            let obj= {total: total , ID: this.props.valueID}
            let date= this.props.valueID
            this.props.pushArray(obj,arr,date)
        })

    }

    time = (e) => {
        this.setState({
            time: Number(e.target.value)
        })
    }

    watt = (e) => {
        this.setState({
            wattage: Number(e.target.value)
        })
    }

    calculation = (watts, hours) => {
        let kwh = watts * hours
        let consumption = kwh * 0.264
        return consumption
    }
    render() {
        let output
        let total
        let projection
        let money

        if (this.state.travelMode === 'drive') {
            output = <div ref={self => this.driveDetialsSelect = self}>
                <p>Driving is your mode of transportation</p>
                MilesPerDay<input type='text' name='drivingMPD' onChange={this.updateState} />
                MilesPerGallon<input type='text' name='drivingMPG' onChange={this.updateState} />
            </div>
        }

        else if (this.state.travelMode === 'publicbus') {
            output = <div ref={self => this.publicbusDetialsSelect = self}>
                <p>Public Bus is your mode of transportation</p>
                MilesPerDay<input type='text' name='drivingMPD' onChange={this.updateState} />
            </div>
        }

        else if (this.state.travelMode === 'walk' || this.state.travelMode === 'bike') {
            output = <div><p>Bike or Walk is your mode of transportation</p>
                <p> Your are amzing green person</p></div>
        }
        if(this.state.total != 0) {
            total= this.state.total
            projection= total * 365* 0.4 
            money= projection * 1.3
        }

        return (
            <div className="App">
            <nav>
              </nav>
              <div className="container">
                  <div className="row">
                      <div className="colume">
                          <h3>Travel </h3>
                          <p>How do you move around?</p>
                          <select name='travelMode' onChange={this.updateState}>
                              <option></option>
                              <option value='drive'>Drive</option>
                              <option value='publicbus'>Public Bus</option>
                              <option value='walk'>Walk</option>
                              <option value='bike'>Bike</option>
                              <option value='none'>None of the above</option>
                          </select>
                           {output}
                      </div>

                      <div className="colume">
                          <h3>Heating Consumption</h3>
                          <p>How Long do You Keep On The Heater Per Day? (hours)</p>
                          <input onChange={this.time} />
                          <p>Wattage (found on appliance label) (in KW)</p>
                          <input onChange={this.watt} />
                      </div>

                      <div className="colume">
                          <h3>Meat Meal</h3>
                          <p>What are you eating today? </p>
                          <select onChange={this.updateState} name="food" >
                              <option value=""> </option>
                              <option value='humbergur'>Hamburger</option>
                              <option value='bacon'>Bacon</option>
                              <option value='steak'>Steak</option>
                              <option value='beef'>Beef</option>
                              <option value='none'>None of the above</option>
                          </select>
                          <p>How many times do you eat this meal per day?</p>
                          RatePerDay<input name="foodNumber" type='text' onChange={this.updateState} />
                      </div>
                  </div>
              </div>
              <div><button onClick={this.updateResult}>Calculate</button></div>
              <div id='total'> Carbon Emission: {total} kg</div>
              <div> Yearly Global Impact Projection: {projection} L of Petrol in A Year </div>
              <div> Price: $ {money}   </div>
          </div>
        )
    }
}


export default Day;
