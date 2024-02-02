import React, { Component } from 'react'
import ZZ5H from './ZZ5H.gif'
//import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="center-text my-3">
       <center><img src={ZZ5H} alt="loading" height={20} width={20} /></center> 
      </div>
    )
  }
}
