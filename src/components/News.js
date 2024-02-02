// Change the import statement to match the correct file path
import React, { Component } from 'react';
import NewsItems from './NewsItems'; 
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps={
    country:"in",
    pageSize:8,
    category:"general"
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

   capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    console.log("hello");
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalresults:0,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsNow`;
  }

 

  async componentDidMount(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0b76d88828d4441b81e4696826b1219&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url)
    let parseddata=await data.json();
    console.log(parseddata);
    this.setState({articles:parseddata.articles,
      totalresults:parseddata.totalresults,
    loading:false})
    this.props.setProgress(100);
  }

  //  handleNextClick=async()=>{
  //    if(!(this.state.page+1>Math.ceil(this.state.totalresults/this.props.pageSize))){}
    
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0b76d88828d4441b81e4696826b1219&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url)
  //   let parseddata=await data.json();
  //   console.log(parseddata);
  //   this.setState({articles:parseddata.articles,
  //     page:this.state.page+1,
  //     loading:false
  //   })
   
    
  
  //  }

  //  handlePrevClick=async()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0b76d88828d4441b81e4696826b1219&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url)
  //   let parseddata=await data.json();
  //   console.log(parseddata);
  //   this.setState({articles:parseddata.articles,
  //     page:this.state.page-1,
  //     loading:false})
  
  //  }

   fetchMoreData =async () => {
   this.setState({
    page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.props.page+1}&apiKey=b0b76d88828d4441b81e4696826b1219&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     
      let data=await fetch(url)
      let parseddata=await data.json();
      this.setState({articles:this.state.articles.concat(parseddata.articles),
      totalresults:parseddata.totalresults,
        loading:false})
  };

  render() {
    return (
      <>
      
        <h1 className="text-center" style={{margin:'40px 0px',marginTop:'90px'}}>NewsNow-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalresults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row" >
        {this.state.articles.map((element)=>{
         return <div className="col-md-3" key={element.url}>
            <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imgurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>

         
        })}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
      
      </>
    );
  }
}

export default News;
