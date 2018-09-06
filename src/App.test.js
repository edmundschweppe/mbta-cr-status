import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import V3Api from './V3Api';
jest.mock('./V3Api');

beforeEach(() => {
  V3Api.mockClear();
});

describe('rendering tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('prediction loading', () => {
  it('loads predictions when api call succeeds', () => {
    const expectedStopId = 'Concord';
    const expectedRouteIds = ['CR-Fitchburg'];
    const json = {
      "data": [
        {
          "attributes": {
            "arrival_time": "2018-09-04T14:19:00-04:00",
            "departure_time": "2018-09-04T14:19:00-04:00",
            "direction_id": 1,
            "schedule_relationship": null,
            "status": null,
            "stop_sequence": 9
          },
          "id": "prediction-CR-Weekday-Spring-18-418-Concord-9",
          "relationships": {
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "schedule": {
              "data": {
                "id": "schedule-CR-Weekday-Spring-18-418-Concord-9",
                "type": "schedule"
              }
            },
            "stop": {
              "data": {
                "id": "Concord",
                "type": "stop"
              }
            },
            "trip": {
              "data": {
                "id": "CR-Weekday-Spring-18-418",
                "type": "trip"
              }
            },
            "vehicle": {
              "data": {
                "id": "1645",
                "type": "vehicle"
              }
            }
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-09-04T14:34:00-04:00",
            "departure_time": "2018-09-04T14:34:00-04:00",
            "direction_id": 0,
            "schedule_relationship": null,
            "status": null,
            "stop_sequence": 9
          },
          "id": "prediction-CR-Weekday-Spring-18-413-Concord-9",
          "relationships": {
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "schedule": {
              "data": {
                "id": "schedule-CR-Weekday-Spring-18-413-Concord-9",
                "type": "schedule"
              }
            },
            "stop": {
              "data": {
                "id": "Concord",
                "type": "stop"
              }
            },
            "trip": {
              "data": {
                "id": "CR-Weekday-Spring-18-413",
                "type": "trip"
              }
            },
            "vehicle": {
              "data": null
            }
          },
          "type": "prediction"
        }
      ],
      "included": [
        {
          "attributes": {
            "bearing": 47,
            "current_status": "STOPPED_AT",
            "current_stop_sequence": 1,
            "direction_id": 1,
            "label": "1645",
            "latitude": 42.553749084472656,
            "longitude": -71.84786224365234,
            "speed": null,
            "updated_at": "2018-09-04T13:25:24-04:00"
          },
          "id": "1645",
          "links": {
            "self": "/vehicles/1645"
          },
          "relationships": {
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "stop": {
              "data": {
                "id": "Wachusett",
                "type": "stop"
              }
            },
            "trip": {
              "data": {
                "id": "CR-Weekday-Spring-18-418",
                "type": "trip"
              }
            }
          },
          "type": "vehicle"
        },
        {
          "attributes": {
            "block_id": "",
            "direction_id": 0,
            "headsign": "Wachusett",
            "name": "413",
            "wheelchair_accessible": 1
          },
          "id": "CR-Weekday-Spring-18-413",
          "links": {
            "self": "/trips/CR-Weekday-Spring-18-413"
          },
          "relationships": {
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "service": {
              "data": {
                "id": "CR-Weekday-NorthSide-Spring-18-RegReduced",
                "type": "service"
              }
            },
            "shape": {
              "data": {
                "id": "9840004",
                "type": "shape"
              }
            },
            "vehicle": {
              "data": null
            }
          },
          "type": "trip"
        },
        {
          "attributes": {
            "block_id": "",
            "direction_id": 1,
            "headsign": "North Station",
            "name": "418",
            "wheelchair_accessible": 1
          },
          "id": "CR-Weekday-Spring-18-418",
          "links": {
            "self": "/trips/CR-Weekday-Spring-18-418"
          },
          "relationships": {
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "service": {
              "data": {
                "id": "CR-Weekday-NorthSide-Spring-18-RegReduced",
                "type": "service"
              }
            },
            "shape": {
              "data": {
                "id": "9840003",
                "type": "shape"
              }
            },
            "vehicle": {
              "data": {
                "id": "1645",
                "type": "vehicle"
              }
            }
          },
          "type": "trip"
        },
        {
          "attributes": {
            "address": "90 Thoreau St, Concord, MA 01742",
            "description": null,
            "latitude": 42.456565,
            "location_type": 0,
            "longitude": -71.357677,
            "name": "Concord",
            "platform_code": null,
            "platform_name": null,
            "wheelchair_boarding": 2
          },
          "id": "Concord",
          "links": {
            "self": "/stops/Concord"
          },
          "relationships": {
            "child_stops": {},
            "facilities": {
              "links": {
                "related": "/facilities/?filter[stop]=Concord"
              }
            },
            "parent_station": {
              "data": null
            }
          },
          "type": "stop"
        },
        {
          "attributes": {
            "arrival_time": "2018-09-04T14:34:00-04:00",
            "departure_time": "2018-09-04T14:34:00-04:00",
            "drop_off_type": 3,
            "pickup_type": 3,
            "stop_sequence": 9,
            "timepoint": true
          },
          "id": "schedule-CR-Weekday-Spring-18-413-Concord-9",
          "relationships": {
            "prediction": {},
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "stop": {
              "data": {
                "id": "Concord",
                "type": "stop"
              }
            },
            "trip": {
              "data": {
                "id": "CR-Weekday-Spring-18-413",
                "type": "trip"
              }
            }
          },
          "type": "schedule"
        },
        {
          "attributes": {
            "arrival_time": "2018-09-04T14:19:00-04:00",
            "departure_time": "2018-09-04T14:19:00-04:00",
            "drop_off_type": 3,
            "pickup_type": 3,
            "stop_sequence": 9,
            "timepoint": true
          },
          "id": "schedule-CR-Weekday-Spring-18-418-Concord-9",
          "relationships": {
            "prediction": {},
            "route": {
              "data": {
                "id": "CR-Fitchburg",
                "type": "route"
              }
            },
            "stop": {
              "data": {
                "id": "Concord",
                "type": "stop"
              }
            },
            "trip": {
              "data": {
                "id": "CR-Weekday-Spring-18-418",
                "type": "trip"
              }
            }
          },
          "type": "schedule"
        }
      ],
      "jsonapi": {
        "version": "1.0"
      }
    };
    const expectedPredictions = [
      {
        id: "prediction-CR-Weekday-Spring-18-418-Concord-9",
        tripNumber: "418",
        tripDestination: "North Station",
        departureTime: new Date("2018-09-04T14:19:00-04:00"),
        scheduledDepartureTime: new Date("2018-09-04T14:19:00-04:00"),
        vehicleNumber: "1645",
        trackNumber: null,
        tripStatus: null
      },
      {
        id: "prediction-CR-Weekday-Spring-18-413-Concord-9",
        tripNumber: "413",
        tripDestination: "Wachusett",
        departureTime: new Date("2018-09-04T14:34:00-04:00"),
        scheduledDepartureTime: new Date("2018-09-04T14:34:00-04:00"),
        vehicleNumber: null,
        trackNumber: null,
        tripStatus: null
      }
    ];

    const expectedResponse = {
      status: 200,
      json: () => { return json },
    };
    const mockGetPredictions = jest.fn();
    mockGetPredictions.mockReturnValue(Promise.resolve(expectedResponse));
    V3Api.mockImplementation(() => {
      return {
        getPredictions: mockGetPredictions,
      };
    });

    const target = new App();
    expect.hasAssertions();
    target.loadPredictionsForStop(expectedStopId, expectedRouteIds)
      .then(actual => {
        expect(mockGetPredictions).toHaveBeenCalledTimes(1);
        expect(actual).toEqual(expectedPredictions);
        //expect(target.state.predictions).toEqual(expectedPredictions);
      });
  });
});
