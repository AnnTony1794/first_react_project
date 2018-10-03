import React, { Component } from 'react'
import Highcharts from 'highcharts'
import swal from 'sweetalert'

export default class Chart extends Component {

  constructor(props){
    super(props)
    this.state = {
      points: this.props.points,
      handler: this.props.handler
    }
  }

  componentDidMount(){
    this.startChart(this.state.points)
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.points !== prevState.points){
      return { points: nextProps.points }
    }
    else return null
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.points !== this.props.points){
      this.startChart(this.state.points)
    }
    else return null
  }

  startChart(points){
    const handler = this.state.handler
    Highcharts.chart('graph',{
      title:{
        text: "Peso vs Fecha"
      },
      xAxis:{
        type:'category',
        startOnTick: true
      },
      plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function(){
                      swal({
                        title: "¿Deseas eliminar este registro?",
                        text: "Fecha: " + this.name + '\nPeso: '+ this.y + ' Kg',
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                          handler(points.filter((point, idx) => idx !== this.x))
                          swal("¡Poof! Has eliminado el registro.", {
                            icon: "success",
                          });
                        } else {
                          swal("No se ha eliminado.");
                        }
                      })
                    }
                }
            }
        }
    },
      series:[
        {
          name: "Peso",
          data: points
        }
      ]
    })
  }

  render(){
    return(
      <div id="graph"  className="z-depth-2 hoverable"></div>
    )
  }
}
