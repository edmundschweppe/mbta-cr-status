/**
 * Consumes the MBTA's version 3 realtime API
 * 
 * @see https://api-v3.mbta.com/docs/swagger/
 * 
 */

import FetchWrapper from "./FetchWrapper";

class V3Api {
    constructor() {
        this.stopId = '';
        this.routeIds = [];
    }

    /**
     * Creates the URL for the MBTA predictions feed
     * 
     * @returns {string} the desired URL
     */
    predictionsUrl() {
        const predictionsUrl = "https://api-v3.mbta.com/predictions?"
        + "include=schedule,stop,trip,vehicle"
        + "&filter[stop]=" + this.stopId
        + "&filter[route]=" + this.routeIds;
        return predictionsUrl;
    }

    /**
     * Gets the latest predictions for the specified stop and routes
     * 
     * @returns {Promise<Response>} predictions API response
     */
    getPredictions() {
        const fw = new FetchWrapper();
        const url = this.predictionsUrl();
        return fw.fetchData(url);
    }
 }

 export default V3Api;