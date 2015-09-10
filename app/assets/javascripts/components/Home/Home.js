var React = require('react');
var FormInputGroup = require('../Shared/FormInputGroup');
var InfiniteScroll = require('react-infinite-scroll')(React);
var MasonryMixin = require('react-masonry-mixin');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
// Components 
var Loader = require('../Shared/Loader');
var ServiceItem = require('../Services/ServiceItem');

// masonry options
var masonryOptions = {
  transtitionDuration: 0
};

var Home = React.createClass({
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  submit: function() {

  },

  loaderMore: function() {

  },

  render: function() {
    var bgImage = 'linear-gradient(to bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url()';
    const subscribeBtn = <button className="btn btn-lg" style={{background:"#76cdd4", borderRadius:"0", color:"white", padding:"10px 35px"}}>搜索</button>;

    var item1 = {
      title: "新品海外上市 何不让最懂得人来帮你思考",
      image: "https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg"
    };

    var item2 = {
      title: "美国销售策略其实还蛮简单",
      image: "https://s3.amazonaws.com/uifaces/faces/twitter/lorenzosinisi/128.jpg"
    };

    var item3 = {
      title: "美国众筹你不知道的秘密",
      image: "https://s3.amazonaws.com/uifaces/faces/twitter/3en/128.jpg"
    };

    var items = [item1, item2, item3].map(function(i) {
      return <ServiceItem item={i} />
    });

    return (
      <div>
        <section className="home-top" style={{backgroundImage:bgImage, overflow:"auto", height:"350px", position:"relative"}}>
          <div style={{borderRadius:"0", border:"none", background:"rgba(0,0,0,0.7)", padding:"5px 0"}}>
            <div className="container">
              <DropdownButton title='策略' noCaret>
                <MenuItem eventKey='1'>品牌上市策略</MenuItem>
                <MenuItem eventKey='2'>产品上市定位策略</MenuItem>
                <MenuItem eventKey='3'>产品上市销售策略拟定</MenuItem>
                <MenuItem eventKey='4'>产品上市营销策略拟定</MenuItem>
                <MenuItem eventKey='5'>产品上市众筹策略拟定</MenuItem>
                <MenuItem eventKey='6'>客户服务策略</MenuItem>
                <MenuItem eventKey='7'>粉丝运营策略</MenuItem>
                <MenuItem eventKey='8'>产品上市总结分析／反思判断</MenuItem>
              </DropdownButton>
              <span style={{color:"white"}}>|</span>
              <DropdownButton title='实现' noCaret></DropdownButton>
              <span style={{color:"white"}}>|</span>
              <DropdownButton title='发布' noCaret></DropdownButton>
            </div>
          </div>

          <div className="mid-section">
            <h2 style={{color:"white"}}>用世界最棒的智慧来帮你做全球营销</h2>
            <div style={{maxWidth:"600px", margin:"30px auto"}}>
              <Formsy.Form className="user-form" onValidSubmit={this.submit}>
                <div className="controls" style={{margin:"0 15px"}}>
                  <FormInputGroup name="search" type="text" buttonAfter={subscribeBtn} style={{color:"white", borderRadius:"0", background:"transparent", height:"46px"}} placeholder="寻找什么样的市场服务" />
                </div>
              </Formsy.Form>
            </div>

            <a style={{color:"#688d96"}}>策略 实现 发布 就是那么简单</a>

          </div>

        </section>

        <section className="service-container">
          <div style={{textAlign:"center"}}>
            <div style={{margin:"30px 0"}}>
              <h2 style={{color:"darkgray"}}>策略服务</h2>
            </div>

            <div>
              <InfiniteScroll ref="masonryContainer"
                loader = {<Loader/>}
                loadMore = {this.loadMore}
                hasMore = {false}>
                {items}
              </InfiniteScroll>
            </div>

          </div>

        </section>
      </div>
    );
  }
});

module.exports = Home;

