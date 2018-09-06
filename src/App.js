import React from 'react';
import './App.css';
import Predictions from './Predictions';
import V3Api from './V3Api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopId: 'South Acton',
      stopName: 'South Acton',
      routeIds: ['CR-Fitchburg'],
      predictions: [],
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.clockTick(), 1000);
  }
  componentWillDismount() {
    clearInterval(this.timerId);
  }

  clockTick() {
    this.loadPredictionsForStop(this.state.stopId, this.state.routeIds);
  }


  loadPredictionsForStop(stopId, routeIds) {
    const api = new V3Api();
    api.stopId = stopId;
    api.routeIds = routeIds;
    return api.getPredictions()
      .then(response => response.json())
      .then(json => {
        return json['data']
          .filter(j => j.attributes.departure_time)
          .map(j => {
            const scheduleId = j.relationships.schedule.data.id;
            const schedule = json['included'].find(j => j.id === scheduleId && j.type === "schedule");
            const scheduledDeparture = new Date(schedule.attributes.departure_time);
            const tripId = j.relationships.trip.data.id;
            const trip = json['included'].find(j => j.id === tripId && j.type === "trip");
            const tripNumber = trip.attributes.name;
            const tripDestination = trip.attributes.headsign;
            let vehicleNumber = null;
            if (j.relationships.vehicle.data) {
              const vehicleId = j.relationships.vehicle.data.id;
              const vehicle = json['included'].find(j => j.id === vehicleId && j.type === "vehicle");
              if (vehicle) {
                vehicleNumber = vehicle.attributes.label;
              }
            };
            let trackNumber = null;
            const predStopId = j.relationships.stop.data.id;
            const predStop = json['included'].find(j => j.id === predStopId && j.type === "stop");
            if (predStop) {
              trackNumber = predStop.attributes.platform_code;
            };
            return {
              id: j.id,
              tripNumber: tripNumber,
              tripDestination: tripDestination,
              departureTime: new Date(j.attributes.departure_time),
              scheduledDepartureTime: scheduledDeparture,
              vehicleNumber: vehicleNumber,
              trackNumber: trackNumber,
              tripStatus: j.attributes.status
            };
          })
          .sort((a, b) => {
            if (a.departureTime > b.departureTime) return 1;
            if (a.departureTime < b.departureTime) return -1;
            return a.tripNumber > b.tripNumber;
          });
      })
      .then(predictions => {
        this.setState({
          predictions: predictions,
        });
        return predictions;
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MBTA Commuter Rail Status</h1>
        </header>
        <span width="100%" className="App-title">{this.state.stopName}</span>
        <Predictions predictions={this.state.predictions} />
      </div>
    );
  }
}

export default App;
