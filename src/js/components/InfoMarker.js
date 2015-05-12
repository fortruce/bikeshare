var React = require('react');
var { Marker, InfoWindow } = require('../components/MapComponents');
var InjectMap = require('../components/InjectMap');

var InfoMarker = React.createClass({
  getInitialState() {
    return {
      info: false,
      click: false
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
                          closeclick={this.infoClose} />);

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
    console.log('show');
    component = component || this.refs.info.getMapNode();
    component.open(this.map, this.refs.marker);
  },
  hideInfo(component) {
    component = component || this.refs.info.getMapNode();
    component.close();
  },
  componentWillUpdate(nProps, nState) {
    if (this.state.info !== nState.info) {
      if (this.state.info)
        this.showInfo();
      else
        this.hideInfo();
    }
  },
  mouseOver() {
    this.setState({info: true});
  },
  mouseOut() {
    if (!this.state.click)
      this.setState({info: false});
  },
  markerClick() {
    console.log('marker click');
    this.setState({
      info: !this.state.info,
      click: !this.state.click
    });
  },
  infoClose() {
    console.log('info closeclick');
    this.setState({
      info: false,
      click: false
    });
  }
});

module.exports = InfoMarker;