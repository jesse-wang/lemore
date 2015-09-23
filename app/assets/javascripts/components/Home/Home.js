var React = require('react');
var FormInputGroup = require('../Shared/FormInputGroup');
var InfiniteScroll = require('react-infinite-scroll')(React);
var MasonryMixin = require('react-masonry-mixin');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
// Actions
var AppActions = require('../../actions/AppActions');
// Components 
var Loader = require('../Shared/Loader');
var ServiceItem = require('../Services/ServiceItem');

// masonry options
var masonryOptions = {
  transtitionDuration: 0
};

var Home = React.createClass({
  // mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  componentWillMount: function() {
    AppActions.requestAllUsers();
  },

  submit: function() {

  },

  loaderMore: function() {

  },

  render: function() {
    var bgImage = 'linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(/bg.jpg)';
    const subscribeBtn =  <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover>抱歉，此功能还未开放</Popover>}>
                            <button className="btn btn-lg" style={{background:"#76cdd4", borderRadius:"0", color:"white", padding:"10px 35px"}}>搜索</button>
                          </OverlayTrigger>;

    var users = this.props.dataStore.get('usersInfo');
    var items = users.map(function(i) {
      return <ServiceItem item={i} />;
    });

    var firstUser, secondUser, thirdUser, fourthUser;
    if (users.length>4) {
      firstUser = <ServiceItem item={users.get('test1')} />;
      secondUser = <ServiceItem item={users.get('test2')} />;
      thirdUser = <ServiceItem item={users.get('test3')} />;
      fourthUser = <ServiceItem item={users.get('test4')} />;
    }
    

    return (
      <div>
        <section className="home-top" style={{backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "50% 10%", backgroundImage:bgImage, overflow:"auto", height:"450px", position:"relative"}}>
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
                  <FormInputGroup name="search" type="text" buttonAfter={subscribeBtn} style={{borderRadius:"0", height:"46px"}} placeholder="寻找什么样的市场服务" />
                </div>
              </Formsy.Form>
            </div>

            <p style={{color:"white", fontWeight:"light"}}>策略 实现 发布 就是那么简单</p>

          </div>

        </section>

        <section className="service-container">
          <div style={{position:"relative"}}>
            <div className="arrow-right"></div>
            <div style={{margin:"20px 0 10px -40px", padding:"5px 20px 5px 50px", background:"#76cdd4", display:"inline-block", position:"relative"}}>
              <h3 style={{color:"white", margin:"0"}}>策略服务</h3>
            </div>

            <div>
              {firstUser}
              {secondUser}
              {thirdUser}
              <div className="service-item wide">
                <img src="/thinking.jpg" alt="新品海外上市" width="100%" height="100%" />
                  <div style={{position:"absolute", top:"0", width:"670px", padding:"30px 60px"}}>
                    <h3 style={{color:"white", marginBottom:"0"}}>新品海外上市，
                    <br/>
                    何不让最懂的人帮你来思考？
                    </h3>
                  </div>
              </div>
              {fourthUser}
            </div>

            <div style={{clear:"both"}}></div>

            {/*<div>
              <InfiniteScroll ref="masonryContainer"
                loader = {<Loader/>}
                loadMore = {this.loadMore}
                hasMore = {false}>
                {items}
              </InfiniteScroll>
            </div>*/}

            <button className="btn center" onClick={this.props.openSignUp} style={{marginTop:"10px", display:"block", borderRadius:"0", background:"#76cdd4", padding:"5px 30px", color:"white"}}>更多高高手</button>
          </div>
        </section>

        <section className="service-container" style={{background:"transparent", padding:"20px 10px"}}>
          <div className="col-sm-3 text-center" style={{margin:"30px auto"}}>
            <img src="/expert.png" style={{maxWidth:"100px"}}/>
            <p></p>
            <p style={{color:"#76cdd4"}}>选择高手</p>
          </div>

          <div className="col-sm-3 text-center" style={{margin:"30px auto"}}>
            <img src="/authenticity.png" style={{maxWidth:"100px"}}/>
            <p></p>
            <p style={{color:"#76cdd4"}}>等到高手确认<br/>一小时内</p>
          </div>

          <div className="col-sm-3 text-center" style={{margin:"30px auto"}}>
            <img src="/communication.png" style={{maxWidth:"100px"}}/>
            <p></p>
            <p style={{color:"#76cdd4"}}>沟通资料开始合作<br/>免费修改资料一次</p>
          </div>

          <div className="col-sm-3 text-center" style={{margin:"30px auto"}}>
            <img src="/comment.png" style={{maxWidth:"100px"}}/>
            <p></p>
            <p style={{color:"#76cdd4"}}>评价高手</p>
          </div>

          <div style={{clear:"both"}}></div>
        </section>

        <section className="text-center" style={{background:"#06a89e", padding:"80px 10px"}}>
          <h3 style={{color:"white", margin:"0", display:"inline-block"}}>怎么发现自己的营销天赋！来验证就知道</h3>
          <button className="btn" onClick={this.props.openSignUp} style={{margin:"5px 15px", borderRadius:"0", verticalAlign:"baseline", fontSize: "24px", background:"white", padding:"3px 30px", color:"#06a89e"}}>成为高手</button>
        </section>

        <section className="text-center" style={{background:"#00686f", padding:"80px 10px"}}>
          <h3 style={{color:"white", margin:"13px 0", display:"inline-block"}}>交易信用保障，由lemore保障安全。</h3>
        </section>

        <section className="text-center" style={{background:"#efefef", height:"250px", position:"relative"}}>
          <img src="/process.png" style={{maxHeight:"100%", maxWidth:"100%", position:"absolute", top:"50%", transform:"translateX(-50%) translateY(-50%)", "-moz-transform": "translateX(-50%) translateY(-50%)", "-o-transform": "translateX(-50%) translateY(-50%)", "-webkit-transform": "translateX(-50%) translateY(-50%)"}} />
        </section>

      </div>
    );
  }
});

module.exports = Home;

