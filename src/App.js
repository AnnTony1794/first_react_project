import React, { Component } from 'react';

//My components
import Navbar from './components/Navbar'
import Chart from './components/Chart'
import Table from './components/Table'

import moment from 'moment'

class App extends Component {

    constructor(props){
      super(props)
      moment.locale('es')
      this.state = {
        points: [1,2,3,4,5,6,7].map((date, idx) => [
          moment(+moment().add(date,'days')).format('DD-MM-YYYY'),
          Math.floor(Math.random() * 20)
        ]),
        counter: 8
      }
      this._onClick = this._onClick.bind(this)
      this.handler = this.handler.bind(this)
    }

    handler = (ChildToParent) =>{
      this.setState({points: ChildToParent})
    }

    _onClick(){
      const newRegister = [
        moment(+moment().add(this.state.counter,'days')).format('DD-MM-YYYY'),
        Math.floor(Math.random() * 20)
      ]
      this.setState({
        points: [...this.state.points, newRegister],
        counter: this.state.counter + 1
      })
    }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row" style={{paddingTop: 20}}>
          <div className="col l6 m6 s12"><Chart handler={this.handler} points={this.state.points} /></div>
          <div className="col l6 m6 s12"><Table points={this.state.points} /></div>
        </div>
        <a
          style={{opacity: 0.85}}
          className="#00bfa5 teal accent-4 btn-floating btn-large fixed-action-btn"
          onClick={this._onClick}>
           <i className="material-icons">add</i>
        </a>
      </div>
    );
  }
}

export default App;
