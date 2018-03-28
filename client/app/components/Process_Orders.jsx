import React from 'react';

export default class Process_Orders extends React.Component {
    render () {
        return (
                <div class="Process_Orders">
                  <h3> Process Orders </h3>
                  <div class="dropdown">
                      <button class="dropbtn">Select Date Range</button>
                      <div class="dropdown-content">
                          <a href="#">Today</a>
                          <a href="#">Yesterday</a>
                          <a href="#">1 Week</a>
                          <a href="#">1 Month</a>
                          <a href="#">3 Months</a>
                          <a href="#">6 Months</a>
                          <a href="#">1 Year</a>
                         <a href="#">All-time</a>
                      </div>
                   </div>
               </div>
        );
    }
}