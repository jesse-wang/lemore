var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Initializers = require('../../constants/Initializers');
var ReactS3Uploader = require('../react-s3-uploader');
var Uri = require('jsuri');
// Actions
var AppActions = require('../../actions/AppActions');
// Components
// var Loader = require('../Shared/Loader');
var Avatar = require('../Shared/Avatar').Avatar;
var Comments = require('../Shared/Comments');

// function replaceURLWithLinks(text){
//     const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/ig;
//     return text.replace(delimiter, '<a href="http://$1">$1</a>'); 
// }

function replaceURLWithLinks(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

var Wrapper = React.createClass({

  componentWillMount: function() {
    this.getData(this.props.params.username);
  },

  componentWillReceiveProps: function(nextProps){
    var oldUsername = this.props.params.username;
    var newUserame = nextProps.params.username;

    // Load new data if user went from project to project
    if(oldUsername != newUserame){
     this.getData(newUserame);
    }
  },

  getData: function(username) {
    AppActions.requestUserInfo({username: username});  
  },

  render: function() {
    var user = this.props.dataStore.get("usersInfo").get(this.props.params.username);
    if (!user) { user = Initializers.emptyUser; }

    return <Expert user={user} session={this.props.session}/>;
  }
});

var Expert = React.createClass({
  getInitialState: function() {
    return {
      editView:    false,
      user:        this.props.user
    };
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({ user: nextProps.user })
  },

  handleChange: function(field, e) {
    var user = this.state.user;
    user[field] = e.target.value;

    this.setState({ user: user });
  },

  handleAvatarChange: function(image) {
    var user = this.state.user;
    user.avatar = image;

    this.setState({ user: user });
  },

  toggleEditView: function(){
    if (this.state.editView) {
      AppActions.updateProfile(this.state.user); 
    }

    this.setState({
      editView: !this.state.editView
    });
  },
  
  render: function(){
    var bgImage = 'linear-gradient(to bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url()';

    var user = this.state.user;

    var comments = [Initializers.comment];

    var editBtn;

    console.log(this.props.session)
    if (this.props.session.isLoggedIn && this.props.session.userInfo.username == user.username) {
      editBtn = <button className="btn btn-primary pull-right" style={{margin:"15px"}} onClick={this.toggleEditView}>{this.state.editView ? 'Done Edit' : 'Edit'}</button> 
    }

    return (
      <div>
        <section ref='header' style={{backgroundImage:bgImage, overflow:"auto", height:"350px", position:"relative"}}>
        </section>

        <section ref='body' className="user-body container">
          <div ref='left' className='col-sm-8'>
            {editBtn}
            <ProfileHeader editView={this.state.editView} user={user} handleChange={this.handleChange} handleAvatarChange={this.handleAvatarChange}/>
            <Services editView={this.state.editView} user={user} handleChange={this.handleChange}/>
            <Portfolio editView={this.state.editView} user={user} handleChange={this.handleChange}/>
            <Profile editView={this.state.editView} user={user} handleChange={this.handleChange}/>
            <Discussion editView={this.state.editView} comments={comments} />

          </div>

          <div ref='right' className='col-sm-4' style={{background:"whitesmoke", padding:"15px"}}>
            <div>
              
              <div>
                <button className='btn btn-block btn-success'>私信（2次）</button>
                {/*<button className='btn btn-block btn-success'>开始合作</button>*/}
              </div>
              
              <div style={{margin:"20px 5px"}}>
                {/*3281个用户给TA打分
                <span className="pull-right">
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <i className="fa fa-star" style={{color:"yellow"}}></i>
                  <span style={{marginLeft:"5px"}}>5</span>
                </span>*/}
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

var ProfileHeader = React.createClass({

  onUploadFinish: function(signedResult){
    var uri = new Uri(signedResult.signedUrl);
    var image = "http://" + uri.host()+uri.path();
    this.props.handleAvatarChange(image);
  },

  render: function(){
    var avatar, nickname, headline;
    var user = this.props.user;
    
    if (this.props.editView) {
      avatar =  <div>
                  <img ref="userAvatar" className="gravatar" style={{width: '150px', height: '150px'}} src={user.avatar} />
                  <div style={{position:"absolute"}}>
                    <ReactS3Uploader signingUrl="/s3_sign" accept="image/*" onFinish={this.onUploadFinish} />
                  </div>
                </div>;
      nickname = <input type="text" placeholder="昵称" value={user.nickname} onChange={this.props.handleChange.bind(this, 'nickname')} style={{display:"inline-block", marginRight:"20px", marginBottom:"10px"}}/>
      headline = <input type="text" placeholder="一句话描述" value={user.headline} onChange={this.props.handleChange.bind(this, 'headline')} style={{display:"inline-block"}}/>
    } else {
      avatar = <Avatar user={user} size="150"/>;
      nickname = <h1 style={{display:"inline-block", marginRight:"20px", marginTop:"0"}}>{user.nickname=='' ? 'TA' : user.nickname}</h1>;
      headline = <p style={{display:"inline-block"}}>{user.headline=='' ? '关于TA' : user.headline}</p>;  
    }

    return(
      <div>
        <div style={{marginTop:"-30px", display:"inline-block"}}>
          {avatar}
        </div>

        <div style={{display:"inline-block", marginLeft:"20px", verticalMargin:"top"}}>
          {nickname}
          {headline}
        </div>
      </div>
    );
  }

});

var Services = React.createClass({

  render: function(){

    return(
      <div style={{padding:"20px 15px"}}>
        <h3>高手技能</h3>
        {/*<div style={{background:"whitesmoke", padding:"10px", margin:"10px 0"}}>
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
        </div>*/}
      </div>
    );
  }

});

var Portfolio = React.createClass({

  render: function(){
    var content;
    
    if (this.props.editView) {
      content = <textarea rows='10' style={{width:"100%"}} value={this.props.user.portfolio} onChange={this.props.handleChange.bind(this, 'portfolio')}/>
    } else {
      content = <p style={{"white-space": "pre-wrap", textOverflow:"ellipsis", overflow:"hidden"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.user.portfolio)}}></p>;
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

  render: function(){
    var content;
    
    if (this.props.editView) {
      content = <textarea rows='10' style={{width:"100%"}} value={this.props.user.profile} onChange={this.props.handleChange.bind(this, 'profile')}/>
    } else {
      content = <p style={{"white-space": "pre-wrap", textOverflow:"ellipsis", overflow:"hidden"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.user.profile)}}></p>;
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

module.exports = Wrapper;

