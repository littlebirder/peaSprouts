import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styls from './css/test.css';
import './style/style.css';
class App extends Component {
    render() {
  	    console.log(styls)
        // console.log(style)
        return <div className='container'> Hello, world! </div>
    }
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)
