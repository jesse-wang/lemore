var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var InfiniteScroll = require('react-infinite-scroll')(React);
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Initializers = require('../../constants/Initializers');
// Actions
// var AppActions = require('../../actions/AppActions');
// Components
// var Loader = require('../Shared/Loader');
var Avatar = require('../Shared/Avatar').Avatar;
var Comments = require('../Shared/Comments');

var Expert = React.createClass({
  
  render: function(){
    var bgImage = 'linear-gradient(to bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url()';

    var user = Initializers.user;
    user.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg";

    var comments = [Initializers.comment];

    return (
      <div>
        <section ref='header' style={{backgroundImage:bgImage, overflow:"auto", height:"350px", position:"relative"}}>
        </section>

        <section ref='body' className="user-body">
          <div ref='left' className='col-sm-8'>
            <div>
              <div style={{marginTop:"-30px", display:"inline-block"}}>
                <Avatar user={user} size="150"/>
              </div>
              <h1 style={{display:"inline-block", marginLeft:"20px", marginRight:"20px"}}>{user.name}</h1>
              <p style={{display:"inline-block"}}>{user.headline}</p>
            </div>

            <div style={{padding:"20px 15px"}}>
              <h3>高手技能</h3>
              <div style={{background:"whitesmoke", padding:"10px", margin:"10px 0"}}>
                <span style={{lineHeight:"2.6"}}>产品策略撰写</span>
                <span className='pull-right'>
                  <Input type='select'>
                    <option value='1'>1 ($50)</option>
                    <option value='2'>2 ($100)</option>
                    <option value='3'>3 ($150)</option>
                  </Input>
                </span>
              </div>
              <div style={{background:"whitesmoke", padding:"10px", margin:"10px 0"}}>
                <span style={{lineHeight:"2.6"}}>文案撰写</span>
                <span className='pull-right'>
                  <Input type='select'>
                    <option value='1'>1 ($100)</option>
                    <option value='2'>2 ($200)</option>
                    <option value='3'>3 ($300)</option>
                  </Input>
                </span>
              </div>
              <div>
                <button className="btn btn-success pull-right">购买（$150)</button>
              </div>
            </div>

            <div style={{padding:"20px 15px"}}>
              <h3>作品介绍</h3>
            </div>

            <div style={{padding:"20px 15px"}}>
              <h3>自我介绍</h3>
            </div>

            <div style={{padding:"20px 15px"}}>
              <h3>评论</h3>
              <Comments comments={comments}/>
            </div>
          </div>

          <div ref='right' className='col-sm-4' style={{background:"whitesmoke", padding:"15px"}}>
            <div>
              
              <div>
                <button className='btn btn-block btn-success'>私信（2次）</button>
                {/*<button className='btn btn-block btn-success'>开始合作</button>*/}
              </div>
              
              <div style={{margin:"20px 5px"}}>
                3281个用户给TA打分
                <span className="pull-right">
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <span style={{marginLeft:"5px"}}>5</span>
                </span>
              </div>

              <div>
                <div className="col-xs-6 text-center" style={{borderRight:"1px solid darkgray"}}>
                  <i className="fa fa-thumbs-o-up" style={{display:"block", color:"#76cdd4", fontSize:"24px", marginTop:"-5px"}}></i>
                  <div style={{marginBottom:"-5px", marginTop:"10px"}}>行家认证</div>
                </div>
                <div className="col-xs-6 text-center">
                  <i className="fa fa-shield" style={{display:"block", color:"#76cdd4", fontSize:"24px", marginTop:"-5px"}}></i>
                  <div style={{marginBottom:"-5px", marginTop:"10px"}}>无忧退款</div>
                </div>
              </div>

            </div>
          </div>

          <div style={{clear:"both"}}></div>
        </section>
      </div>
    );
  }
});

module.exports = Expert;

