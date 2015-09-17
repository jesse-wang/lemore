var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Initializers = require('../../constants/Initializers');
// Actions
var AppActions = require('../../actions/AppActions');
// Components
// var Loader = require('../Shared/Loader');
var Avatar = require('../Shared/Avatar').Avatar;
var Comments = require('../Shared/Comments');

function replaceURLWithLinks(text){
    const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/ig;
    return text.replace(delimiter, '<a href="http://$1">$1</a>'); 
}

var Expert = React.createClass({

  getInitialState: function() {
    // var user = this.props.dataStore.get("usersInfo").get(this.props.params.username);
    // if (!user) { user={}; }
    return {
      editView:    false
    };
  },

  componentWillMount: function() {
    this.getData(this.props.params.username);
  },

  getData: function(username) {
    AppActions.requestUserInfo({username: username});  
  },

  toggleEditView: function(){
    this.setState({
      editView: !this.state.editView
    });
  },
  
  render: function(){
    var bgImage = 'linear-gradient(to bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url()';

    var user = this.props.dataStore.get('usersInfo').get(this.props.params.username);
    console.log(this.props.dataStore.get('usersInfo').toJS())
    if (!user) { user=Initializers.user; }
    // user.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg";

    var comments = [Initializers.comment];

    return (
      <div>
        <section ref='header' style={{backgroundImage:bgImage, overflow:"auto", height:"350px", position:"relative"}}>
        </section>

        <section ref='body' className="user-body container">
          <div ref='left' className='col-sm-8'>
            <div>
              <div style={{marginTop:"-30px", float:"left"}}>
                <Avatar user={user} size="150"/>
              </div>

              <div style={{display:"inline-block", marginLeft:"20px"}}>
                <h1>{user.username}</h1>
                <p>{user.headline}</p>
                <button className="btn btn-primary" onClick={this.toggleEditView}>{this.state.editView ? 'Done Edit' : 'Edit'}</button>
              </div>
            </div>

            <Services editView={this.state.editView} username={user.username} services={user.services} />
            <Portfolio editView={this.state.editView} username={user.username} portfolio={user.portfolio} />
            <Profile editView={this.state.editView} username={user.username} profile={user.profile} />
            <Discussion editView={this.state.editView} comments={comments} />

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

var Services = React.createClass({

  render: function(){

    return(
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
    );
  }

});

var Portfolio = React.createClass({

  getInitialState: function() {
    return { portfolio: null };
  },

  handleChange: function(e) {
    this.setState({ portfolio: e.target.value });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({ portfolio: nextProps.portfolio });

    if (this.props.editView && !nextProps.editView) {
      var data = {field: 'portfolio', username: this.props.username, content: this.state.portfolio};
      AppActions.updateProfile(data);
    }
  },

  render: function(){
    var content;
    
    if (this.props.editView) {
      var content = <textarea ref='portfolio' rows='10' style={{width:"100%"}} value={this.state.portfolio} onChange={this.handleChange}/>
    } else {
      if (this.props.portfolio) {
        content = <p style={{"white-space": "pre-wrap"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.portfolio)}}></p>;
      }
    }

    return(
      <div style={{padding:"20px 15px"}}>
        <h3>作品介绍</h3>
        <div style={{padding:"20px 15px", background:"whitesmoke"}}>
          {content}
        </div>
      </div>
    );
  }

});

var Profile = React.createClass({

  getInitialState: function() {
    return { profile: null };
  },

  handleChange: function(e) {
    this.setState({ profile: e.target.value });
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({ profile: nextProps.profile });

    if (this.props.editView && !nextProps.editView) {
      var data = {field: 'profile', username: this.props.username, content: this.state.profile};
      AppActions.updateProfile(data);
    }
  },

  render: function(){
    var content;
    
    if (this.props.editView) {
      var content = <textarea rows='10' style={{width:"100%"}} value={this.state.profile} onChange={this.handleChange}/>
    } else {
      if (this.props.profile) {
        content = <p style={{"white-space": "pre-wrap"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.profile)}}></p>;
      }
    }

    return(
      <div style={{padding:"20px 15px"}}>
        <h3>自我介绍</h3>
        <div style={{padding:"20px 15px", background:"whitesmoke"}}>
          {content}
        </div>
      </div>
    );
  }

});

var Discussion = React.createClass({

  render: function(){

    return(
      <div style={{padding:"20px 15px"}}>
        <h3>评论</h3>
        <Comments comments={this.props.comments}/>
      </div>
    );
  }

});

module.exports = Expert;

