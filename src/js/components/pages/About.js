import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="text-post">
        <h2 className="center text-post__header">About Bike In DC</h2>
        <div className="text-post__body">
          <p>Bike In DC was created to make navigating DC using Capital Bikeshare easier.
          Spotcycle is too busy and hard to navigate. Bike In DC puts the information
          you need to see up front with no hassle.</p>

          <p>Bike In DC is built and maintained by a single developer, me. I built
          Bike In DC out of frustration, and I want to ensure that it stays simple
          and easy to use. If you are ever frustrated with Bike In DC, then please
          say something!</p>

          <p>I am excited to continue working on Bike In DC, and I have a few new
          features in the works. If you have any ideas, comments, or thoughts, I would
          love to hear them.</p>

          <p>Thanks for using Bike In DC. I hope it has made your Bikeshare experience
          easier, and I look forward to seeing you on the road.</p>

          <br />
          <h5 className="center">Contact</h5>
          <p className="center">Email: support@bikeindc.com</p>
        </div>
      </div>
    );
  }
}