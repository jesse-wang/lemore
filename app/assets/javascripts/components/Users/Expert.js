var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Initializers = require('../../constants/Initializers');
var ReactS3Uploader = require('../react-s3-uploader');
var Uri = require('jsuri');
var Cx = require('classnames');
var Table = require('../../util/table');
// Actions
var AppActions = require('../../actions/AppActions');
// Components
// var Loader = require('../Shared/Loader');
var Avatar = require('../Shared/Avatar').Avatar;
var Comments = require('../Shared/Comments');

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
    AppActions.requestUserComments({username: username});
  },

  render: function() {
    var allUsers = this.props.dataStore.get("usersInfo");
    var user = allUsers.get(this.props.params.username);
    if (!user) { user = Initializers.emptyUser; }

    return <Expert user={user} session={this.props.session} openSignIn={this.props.openSignIn} dataStore={this.props.dataStore}/>;
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

    var comments = this.props.dataStore.getIn(['usersComments', user.username]);
    console.log(comments)
    if (!comments) {
      comments = [];
    }

    var editBtn;

    if (this.props.session.isLoggedIn && this.props.session.userInfo.username == user.username) {
      editBtn = <button className="btn btn-primary" style={{position:"absolute", right:"15px", top:"15px"}} onClick={this.toggleEditView}>{this.state.editView ? 'Done Edit' : 'Edit'}</button> 
    }

    return (
      <div>
        <section ref='header' style={{backgroundImage:bgImage, overflow:"auto", height:"350px", position:"relative"}}>
        </section>

        <section ref='body' className="user-body container">
          <div ref='left' className='col-sm-8'>
            {editBtn}
            <ProfileHeader editView={this.state.editView} user={user} handleChange={this.handleChange} handleAvatarChange={this.handleAvatarChange}/>
            <Services editView={this.state.editView} user={user} />
            <Portfolio editView={this.state.editView} user={user} handleChange={this.handleChange}/>
            <Profile editView={this.state.editView} user={user} handleChange={this.handleChange}/>
            <Discussion receiver={user} comments={comments} session={this.props.session} openSignIn={this.props.openSignIn}/>

          </div>

          <div ref='right' className='col-sm-4' style={{background:"whitesmoke", padding:"15px"}}>
            <div>
              
              <div>
                <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover>抱歉，此功能还未开放</Popover>}>
                  <button className='btn btn-block btn-success'>私信（2次）</button>
                </OverlayTrigger>
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
    var avatar, nickname, position, headline;
    var user = this.props.user;
    
    if (this.props.editView) {
      avatar =  <div>
                  <img ref="userAvatar" className="gravatar" style={{width: '150px', height: '150px'}} src={user.avatar} />
                  <div style={{position:"absolute"}}>
                    <ReactS3Uploader signingUrl="/s3_sign" accept="image/*" onFinish={this.onUploadFinish} />
                  </div>
                </div>;
      nickname = <input type="text" placeholder="昵称" value={user.nickname} onChange={this.props.handleChange.bind(this, 'nickname')} style={{display:"inline-block", marginRight:"20px", marginBottom:"10px"}}/>;
      position = <input type="text" placeholder="职位" value={user.position} onChange={this.props.handleChange.bind(this, 'position')} style={{display:"inline-block"}}/>;
      headline = <textarea row="2" type="text" placeholder="一句话描述" value={user.headline} onChange={this.props.handleChange.bind(this, 'headline')} style={{display:"block", width:"100%"}}/>;
    } else {
      avatar = <Avatar user={user} size="150"/>;
      nickname = <h1 style={{display:"inline-block", marginRight:"20px", marginTop:"0"}}>{user.nickname=='' ? 'TA' : user.nickname}</h1>;
      position = <p style={{display:"inline-block"}}>{user.position=='' ? 'TA的职位' : user.position}</p>;  
      headline = <p style={{display:"inline-block"}}>{user.headline=='' ? '关于TA' : user.headline}</p>;  
    }

    return(
      <div>
        <div className="col-sm-4" style={{marginTop:"-30px", maxWidth:"170px"}}>
          {avatar}
        </div>

        <div className="col-sm-8" style={{marginTop:"30px"}}>
          {nickname}
          {position}
          {headline}
        </div>

        <div style={{clear:"both"}}></div>
      </div>
    );
  }

});

var Services = React.createClass({

  getInitialState: function() {
    return {
      newServiceName:  "",
      newServicePrice: "",
      newServiceDesc:  "",
      selectedServices: []
    };
  },

  nameHandler: function() {
    this.setState ({
      newServiceName: event.target.value
    });
  },

  priceHandler: function() {
    this.setState ({
      newServicePrice: event.target.value
    });
  },

  descHandler: function() {
    this.setState ({
      newServiceDesc: event.target.value
    });
  },

  onConfirm: function(){
    var data = {name: this.state.newServiceName, price: this.state.newServicePrice, description: this.state.newServiceDesc, user_id: this.props.user.id};
    AppActions.createService(data);
    this.onCancel();
  },

  onCancel: function(){
    this.setState({
      newServiceName:  "",
      newServicePrice: "",
      newServiceDesc:  ""
    });
  },

  onDelete: function(service){
    AppActions.deleteService({id: service.id});
  },

  onSelect: function(service){
    var services = this.state.selectedServices;
    services[service.id] = {price: service.price, num: event.target.value};
    
    this.setState({
      selectedServices: services
    });
  },

  render: function(){
    var total = 0;

    this.state.selectedServices.map(function(ss) {
      total += ss.price * ss.num;
    });

    var purchaseBtnClass = Cx({
      'btn btn-success pull-right': true,
      'disabled': total == 0
    });   

    var content;
    if (this.props.editView) {
      var _this = this;
      services = this.props.user.services.map(function(s) {
        return  <div style={{background:"whitesmoke", padding:"10px", margin:"10px 0"}}>
                  <span style={{lineHeight:"2.6"}}>{s.name}</span>
                  <Button className='pull-right' style={{"outline":"none"}} bsStyle='link' onClick={_this.onDelete.bind(this, s)}><i className="fa fa-trash" style={{"fontSize":"24px", "color":"gray"}}></i></Button>
                  <span className='pull-right' style={{lineHeight:"2.6", marginRight:"10px"}}>${s.price}</span>
                </div>;
      });

      content = <div>
                  {services}
                  <div style={{overflow:"auto"}}>
                    <input style={{"width":"65%", marginBottom:"10px"}} placeholder="New service's name" type="text" value={this.state.newServiceName} onChange={this.nameHandler}/>
                    <input style={{"width":"30%", marginBottom:"10px", float:"right"}} placeholder="Price ($)" type="number" value={this.state.newServicePrice} onChange={this.priceHandler}/>
                    <textarea rows='5' style={{width:"100%"}} placeholder="Description" type="text" value={this.state.newServiceDesc} onChange={this.descHandler}/>
                    <Button style={{"outline":"none"}} bsStyle='link' onClick={this.onConfirm}><i className="fa fa-check" style={{"fontSize":"24px", "color":"green"}}></i></Button>
                    <Button style={{"outline":"none"}} bsStyle='link' onClick={this.onCancel}><i className="fa fa-remove" style={{"fontSize":"24px", "color":"red"}}></i></Button>
                  </div>
                </div>;
    } else {
      var _this = this;
      services = this.props.user.services.map(function(s) {
        return  <div style={{background:"whitesmoke", padding:"10px", margin:"10px 0"}}>
                  <span style={{lineHeight:"2.6"}}>{s.name}</span>
                  
                  <span className='pull-right'>
                    <Input type='select' onChange={_this.onSelect.bind(this, s)}>
                      <option value='0'>0</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </Input>
                  </span>

                  <span className='pull-right' style={{lineHeight:"2.6", marginRight:"10px"}}>${s.price}</span>
                </div>;
      });

      content = <div>
                  {services}
                  <div>
                    <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover>抱歉，此功能还未开放</Popover>}>
                      <button className={purchaseBtnClass}>购买 (${total})</button>
                    </OverlayTrigger>
                  </div>
                </div>;
    }
    
    return(
      <div style={{padding:"20px 15px"}}>
        <h3>高手技能</h3>
        {content}
      </div>
    );
  }

});

var Portfolio = React.createClass({

  render: function(){
    var content;
    
    if (this.props.editView) {
      content = <textarea rows='10' style={{width:"100%"}} value={this.props.user.portfolio} onChange={this.props.handleChange.bind(this, 'portfolio')}/>;
    } else {
      content = <p style={{whiteSpace: "pre-wrap", textOverflow:"ellipsis", overflow:"hidden"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.user.portfolio)}}></p>;
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
      content = <textarea rows='10' style={{width:"100%"}} value={this.props.user.profile} onChange={this.props.handleChange.bind(this, 'profile')}/>;
    } else {
      content = <p style={{whiteSpace: "pre-wrap", textOverflow:"ellipsis", overflow:"hidden"}} dangerouslySetInnerHTML={{__html: replaceURLWithLinks(this.props.user.profile)}}></p>;
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
        <Comments receiver={this.props.receiver} comments={this.props.comments} session={this.props.session} openSignIn={this.props.openSignIn}/>
      </div>
    );
  }

});

module.exports = Wrapper;

