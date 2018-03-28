import React from 'react';
import App_Header from './components/App_Header.jsx';
import Login from './components/Login.jsx';
import Main_Menu from './components/Main_Menu.jsx';
import Process_Orders from './components/Process_Orders.jsx';
import Edit_Items from './components/Edit_Items.jsx';

export default class App extends React.Component {
    render () {
        return (
                <div className="App">
                        <App_Header />
                        <Login />
                    </div>    
        );
    }
}