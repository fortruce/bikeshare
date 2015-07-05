import * as constants from '../constants';
import { locationChange } from './location';
import { stringifyLatLng } from '../utils';

const dcLatLng = new google.maps.LatLng(38.9047, -77.0164);
const dcRadius = 20000;
const dcBounding = new google.maps.LatLngBounds(
	new google.maps.LatLng(38.666791, -77.332930),
	new google.maps.LatLng(39.047495, -76.816573)
);

const map = new google.maps.Map(
	document.createElement('div'),
	{
		center: dcLatLng,
		zoom: 8
	}
);
const placesService = new google.maps.places.PlacesService(map);

// Trigger a Google Maps Places textSearch
// If a single result is found, redirect to the single result's /nearby/lat,lng
// 		Store the result keyed off latlng into localStorage
// Else emit a SEARCH action with the SearchResults
export function search(query, router) {
	return dispatch => {
		dispatch({
			type: constants.SEARCH_STARTED,
			query: query
		});

		placesService.textSearch({
			query: query,
			location: dcLatLng,
			radius: dcRadius
		}, (results, status) => {
			if (status !== google.maps.places.PlacesServiceStatus.OK)
				return console.log('ERROR: Places search failed - ', status);
			if (results.length === 1) {
				const latlng = stringifyLatLng(results[0].geometry.location);

				router.replaceWith('/nearby/' + latlng, { name: results[0].name });
			} else {
				return dispatch({
					type: constants.SEARCH_COMPLETED,
					results: results,
					query: query
				});
			}
		});
	}
}