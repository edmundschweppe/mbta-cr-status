/**
 * Component to display the current set of predictions 
 */

import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Predictions extends React.Component {
    render() {
        const preds = this.props.predictions;
        const formatOptions = { hour: 'numeric', minute: 'numeric' };
        const timeFormatter = new Intl.DateTimeFormat('en-US', formatOptions);
        const mainCols = [
            {
                Header: 'Train',
                accessor: 'tripNumber'
            },
            {
                Header: 'Destination',
                accessor: 'tripDestination'
            },
            {
                Header: 'Time',
                accessor: 'timeDetails',
                Cell: row => (
                    <div>
                        <span width="100%">{row.value.predicted}</span>
                        {row.value.lateness &&
                            <div>
                                <span width="100%" class="Predictions_Lateness">{row.value.lateness}</span>
                            </div>
                        }
                    </div>
                )
            }
        ];
        const statusCol = [
            {
                Header: 'Status',
                accessor: 'tripStatus'
            }
        ];
        const predsMap = preds.map(p => {
            const msecLate = p.departureTime.getTime() - p.scheduledDepartureTime.getTime();
            const minLate = Math.round((msecLate / 1000) / 60);
            const lateness = (minLate > 5) ? minLate.toString() + ' minutes late' : null;
            return {
                tripNumber: p.tripNumber,
                tripDestination: p.tripDestination,
                departureTime: timeFormatter.format(p.departureTime),
                timeDetails: {
                    predicted: timeFormatter.format(p.departureTime),
                    lateness: lateness
                },
                tripStatus: (p.tripStatus || '')
                    + (p.trackNumber ? ' Track ' + p.trackNumber : '')
                    + (p.vehicleNumber ? ' Cab car ' + p.vehicleNumber : '')
            }
        });
        const hasStatus = (predsMap.findIndex(p => p.tripStatus) > -1);
        return (
            <ReactTable
                noDataText="No predictions for this station"
                columns={hasStatus ? mainCols.concat(statusCol) : mainCols}
                data={preds}
                resolveData={preds => predsMap}
            />
        );
    }
}
export default Predictions;