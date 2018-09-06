/**
 * Unit tests for V3Api class
 */

import V3Api from './V3Api';
import FetchWrapper from './FetchWrapper';
jest.mock('./FetchWrapper');

beforeEach(() => {
    FetchWrapper.mockClear();
});



describe('predictions', () => {
    it('creates correct URL for one stop and route', () => {
        let target = new V3Api();
        target.stopId = 'Concord';
        target.routeIds = ['CR-Fitchburg'];
        const expectedUrl = "https://api-v3.mbta.com/predictions?include=schedule,stop,trip,vehicle"
            + "&filter[stop]=Concord"
            + "&filter[route]=CR-Fitchburg";

        expect(target.predictionsUrl()).toEqual(expectedUrl);
    });

    it('creates correct URL for one stop and multiple routes', () => {
        let target = new V3Api();
        target.stopId = 'place-north';
        target.routeIds = ['CR-Fitchburg', 'CR-Haverhill', 'CR-Lowell', 'CR-Newburyport'];
        const expectedUrl = "https://api-v3.mbta.com/predictions?include=schedule,stop,trip,vehicle"
            + "&filter[stop]=place-north"
            + "&filter[route]=CR-Fitchburg,CR-Haverhill,CR-Lowell,CR-Newburyport";

        expect(target.predictionsUrl()).toEqual(expectedUrl);
    });

    it('uses correct URL and gets JSON on success', () => {
        const expectedStopId = 'Concord';
        const expectedRouteIds = ['CR-Fitchburg'];
        const expectedStatus = 200;
        const expectedJson = {
            "data": [
                {
                    "attributes": {
                        "arrival_time": "2018-09-03T22:34:39-04:00",
                        "departure_time": "2018-09-03T22:34:39-04:00",
                        "direction_id": 1,
                        "schedule_relationship": null,
                        "status": null,
                        "stop_sequence": 9
                    },
                    "id": "prediction-CR-Sunday-Spring-18-2412-Concord-9",
                    "relationships": {
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
                                "id": "CR-Sunday-Spring-18-2412",
                                "type": "trip"
                            }
                        }
                    },
                    "type": "prediction"
                }
            ],
            "jsonapi": {
                "version": "1.0"
            }
        };
        const mockFetchData = jest.fn();
        mockFetchData.mockReturnValue(Promise.resolve({
            status: expectedStatus,
            json: expectedJson,
        }));
        FetchWrapper.mockImplementation(() => {
            return {
                fetchData: mockFetchData,
            }
        });
        
        const target = new V3Api();
        target.stopId = expectedStopId;
        target.routeIds = expectedRouteIds;
        const expectedUrl = target.predictionsUrl();

        expect.hasAssertions();
        return target.getPredictions()
            .then(actual => {
                expect(mockFetchData).toHaveBeenCalledWith(expectedUrl);
                expect(actual.status).toBe(expectedStatus);
                expect(actual.json).toBe(expectedJson);
                expect(target.stopId).toBe(expectedStopId);
                expect(target.routeIds).toBe(expectedRouteIds);
            });
    });
})
