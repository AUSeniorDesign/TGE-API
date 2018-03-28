import React from 'react';

export default class Main_Menu extends React.Component {
    render () {
        return (
                <div className="Main_Menu">
                    <h1> Main Menu </h1>
                    <button className="process-orders-button">Process Orders</button>
                    <button className="edit-items-button">Edit Items</button>
                </div>
        );
    }
}