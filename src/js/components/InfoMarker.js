var React = require('react');
var { Marker, InfoWindow } = require('../components/MapComponents');
var InjectMap = require('../components/InjectMap');

var InfoMarker = React.createClass({
  getInitialState() {
    return {
      state: 'show',
      marker: undefined
    };
  },
  componentDidMount() {
    this.setState({
      marker: this.refs.marker.getMapNode()
    });
  },
  render() {
    var info = [];
    if (this.state.marker)
      info = (<InfoWindow ref="info"
                          open={this.showInfo}
                          close={this.hideInfo}
                          closeclick={this.markerClick} />);

    return (
      <InjectMap map={this.props.map}>
        <Marker ref="marker"
                mouseover={this.mouseOver}
                mouseout={this.mouseOut}
                click={this.markerClick}
                {...this.props.marker} />
        {info}
      </InjectMap>
    );
  },
  showInfo(component) {
    component = component || this.refs.info.getMapNode();
    component.open(this.props.map, this.refs.marker.getMapNode());
  },
  hideInfo(component) {
    component = component || this.refs.info.getMapNode();
    component.close();
  },
  shouldComponentUpdate(nProps, nState) {
    if (this.state.marker === undefined)
      return true;
    switch(this.state.state) {
    case 'hover':
    case 'show':
      return nState.state === 'hide';
      break;
    case 'hide':
      return nState.state !== 'hide';
      break;
    }
    return false;
  },
  componentDidUpdate(pProps, pState) {
    switch (this.state.state) {
    case 'show':
    case 'hover':
      this.showInfo();
      break;
    case 'hide':
      this.hideInfo();
      break;
    }
  },
  mouseOver() {
    switch (this.state.state) {
      case 'hide':
        this.setState({state: 'hover'});
        break;
    }
  },
  mouseOut() {
    switch (this.state.state) {
      case 'hover':
        this.setState({state: 'hide'});
        break;
    }
  },
  markerClick() {
    switch (this.state.state) {
      case 'hover':
      case 'hide':
        this.setState({state: 'show'});
        break;
      case 'show':
        this.setState({state: 'hide'});
        break;
    }
  }
});

module.exports = InfoMarker;