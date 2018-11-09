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


    //weeksInYear = 52
    //carbonPerGallon = 0.4

    
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
            console.log(obj)
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

        if (this.state.travelMode === 'drive') {
            output = <div ref={self => this.driveDetialsSelect = self}>
                <p>Driving is your ..,,will use if else statement to show this option</p>
                MilesPerDay<input type='text' name='drivingMPD' onChange={this.updateState} />
                MilesPerGallon<input type='text' name='drivingMPG' onChange={this.updateState} />
            </div>
        }

        else if (this.state.travelMode === 'publicbus') {
            output = <div ref={self => this.publicbusDetialsSelect = self}>
                <p>Public Bus is your ..,,will use if else statement to show this option</p>
                MilesPerDay<input type='text' name='drivingMPD' onChange={this.updateState} />
            </div>
        }

        else if (this.state.travelMode === 'walk' || this.state.travelMode === 'bike') {
            output = <div><p>Bike and Walk is your way..,,will use if else statement to show this option</p>
                <p> Your are amzing green person</p></div>
        }

        if (this.state.total !== 0) {
        total = 
         <p>Total C02 Emission: {this.state.total}</p>
    }


        return (
            <div className= "App">
                <h1>Carbon Calculator</h1>
                <div className='container'>
                    <div className='col'>
                        <div className='row'>
                            <h2>Travel</h2>
                            <p>How do you move around?</p>
                            <select ref={self => this.moveAroundSelect = self} name='travelMode' onChange={this.updateState}>
                                <option></option>
                                <option value='drive'>Drive</option>
                                <option value='publicbus'>Public Bus</option>
                                <option value='walk'>Walk</option>
                                <option value='bike'>Bike</option>
                                <option value='none'>None of the above</option>
                            </select>

                            <div>{output}</div>
                            <div>
                                <h2>Heating Consumption</h2>
                                <div>How Long do You Keep On The Heater Per Day? (hours)  <input onChange={this.time} /> </div>
                                <div>Wattage (found on appliance label) (in KW)  <input onChange={this.watt} /> </div>
                            </div>
                            <div className='row'>
                                <p>What are you eating today? </p>
                                <select onChange= {this.updateState} name= "food" >
                                    <option value=""> </option>
                                    <option value='humbergur'>Humburger</option>
                                    <option value='bacon'>Bacon</option>
                                    <option value='steak'>Steak</option>
                                    <option value='beef'>Beef</option>
                                    <option value='none'>None of the above</option>
                                </select>
                                <p>How many times do you eat this meal per day?</p>
                                RatePerWeek<input name="foodNumber" type='text' onChange={this.updateState} />
                            </div>
                            <button onClick={this.updateResult }>Calculate</button>
                            {total}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Day;
