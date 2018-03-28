import React from 'react';

export default class Edit_Items extends React.Component {
    render () {
        return (
                <div class="Edit_Items">
                    <h3> Edit Items </h3>
                    <button className="Upload-CSV">Upload Items via CSV</button>
                    <button className="Return-to-Main-Menu">Return to Main Menu</button>
                </div>   
        );
    }
}