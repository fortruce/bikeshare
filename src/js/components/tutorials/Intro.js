import React from 'react';
import StationRow from '../StationRow';
import GpsIcon from '../pure/GpsIcon';

export default class Intro extends React.Component {
  render() {
    return (
      <div className="text-post">
        <h3 className="text-post__header">Welcome to BikeInDC</h3>
        <div className="text-post__body">
          <p>Bike In DC provides a very simple way to get the status of nearby
          Capital Bikeshare stations. <b>Here's how it works.</b></p>

          <p>There are three major component to Bike In DC: the <b>navbar</b>, the <b>station
          list</b>, and the <b>menu</b>.</p>
          <hr />

          <h4 className="text-post__header">Navbar</h4>

          <p>The navbar is always available at the top of the page. It allows you to
          easily focus on your current location or search for other locations nearby.</p>

          <h5 className="text-post__header">Gps Icon</h5>
          <p id="tutorial--gps">The Gps Icon on the left of the navbar is used to indicate if Bike In DC is
          tracking your current location.</p>
          <p>
          If the icon is <b>enabled</b>,</p>
            <GpsIcon disabled={false} link="#tutorial--gps" />
          <p>
          then your location is currently being tracked and the station information
          should be kept up to date with your current position.
          </p>
          <p>
          If the icon is <b>disabled</b>,
          </p>
            <GpsIcon disabled={true} link="#tutorial--gps" />
          <p>
          then your location is not being tracked and the station information is
          not updated based on your location changes.
          </p>
          <p>
          You can toggle location tracking back on by clicking the disabled Gps Icon.
          </p>

          <h5 className="text-post__header">Search</h5>

          <p>The Search is located in the middle of the Navbar. You can search for places
          by address, name, or keywords. The search is powered by Google Places.</p>

          <p>If your search cannot be found exactly, then a few options will be listed for
          you to pick from. The search will then redirect you to a view of the stations
          nearby your target location.</p>

          <h5 className="text-post__header">Menu Toggle</h5>

          <p>Finally, on the far right of the navbar, a menu toggle button, <i className="material-icons">menu</i>,
          might be present. If it is present, then clicking the button will toggle the menu
          to slide in from the side of the screen. Clicking the button again, an <i className="material-icons">close</i>
          when toggled, will hide the menu again.</p>
          <hr />
          <h4 className="text-post__header">Station List</h4>

          <p>The main view of Bike In DC is the Station List. This is the list of
          stations either nearest to your current location or a location you searched for through
          the navbar.</p>

          <div style={{border: '1px solid #e0e0e0', padding: '15px 20px'}}>
            <StationRow station={{
              distance: 1.2,
              name: 'Example Station',
              nbBikes: 12,
              nbEmptyDocks: 7,
              lat: 38.9047,
              lng: -77.0164
            }} />
          </div>

          <p>The title of the station links to Google Maps directions from your current location
          to that station. To the right of the station name and distance is the number
          of bikes and open docks respectively.</p>

          <hr />
          <h4 className="text-post__header">Menu</h4>

          <p>The menu is either toggleable through the navbar, or, if your screen is large enough,
          always present to the left of the screen. The menu provides quick links throughout Bike In DC.
          If you would ever like to visit this Tutorial again, simply navigate to the Tutorial link in the Menu.</p>

          <hr />
          <h4 className="text-post__header">The End!</h4>

          <p>Thank you for reading through the getting started guide. I hope that Bike In DC helps you
          get where you need to go faster and easier! If you would like to read more about Bike In DC, then
          visit the About section through the menu.</p>
          <p>Be safe.</p>

        </div>
      </div>
    );
  }
}