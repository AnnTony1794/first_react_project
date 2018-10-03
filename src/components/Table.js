import React from 'react'
import swal from 'sweetalert'

export default ({points}) =>{
  const _onClick = (date, weight) =>{
    swal('Tu peso fue...', 'Fecha: ' + date + '\nPeso: ' + weight + ' Kg', 'info')
  }
  return(
    <table  className="z-depth-2 hoverable">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Peso</th>
        </tr>
      </thead>
      <tbody>
        {
          points.map((point, idx) =>(
              <tr key={idx} onClick={() => _onClick(point[0], point[1])}>
                <td>{point[0]}</td>
                <td>{point[1]} kg</td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  )
}
