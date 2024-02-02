import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    let {title,description,imgurl,url,author,date}=this.props;
    return (
      <div>
        <div className="card">
        {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'70%',zIndex:'1'}}>
   {source}
   
  </span> */}
  <img src={!imgurl?"https://images.moneycontrol.com/static-mcnews/2017/07/porinju_Vel-770x433.jpg":imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems
