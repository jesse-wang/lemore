var React = require('react');
var Link = require('react-router').Link;
var InfiniteScroll = require('react-infinite-scroll')(React);
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
// Actions
// var AppActions = require('../../actions/AppActions');
// Constants
var Initializers = require('../../constants/Initializers');
// Components
var Loader = require('../Shared/Loader');

function replaceAtMentionsWithLinks(text){
  return text.replace(/@([a-z\d_]+)/ig, '<a href="/u/$1">@$1</a>'); 
}

function replaceURLWithLinks(text){
    const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/ig;
    return text.replace(delimiter, '<a href="http://$1">$1</a>'); 
}

var Comments = React.createClass ({
  getInitialState: function(){
    return {
      commentText: '',
      comments: this.props.comments,
      hasMore: false
    };
  },

  componentWillReceiveProps: function(nextProps){
    var nextLen = nextProps.comments.length;
    var thisLen = this.props.comments.length;
    this.setState({
      comments: nextProps.comments,
      hasMore: nextLen-thisLen<0 || nextLen-thisLen==Initializers.perPage || nextLen == thisLen
    });
  },

  handleChange: function(e){
    this.setState({
      commentText: e.target.value
    });
  },

  replyUser: function(name, e){
    React.findDOMNode(this.refs.commentText).focus();
    this.setState({
      commentText: "@" + name + " "
    });
  },

  upvoteComment: function(comment, i){
    // var c = this.state.comments[i];
    // c.upvoted = !c.upvoted;

    // var comments = this.state.comments;
    // comments[i] = c;
    // this.setState({comments: comments});

    // AppActions.upvoteComment({id: comment.id, type: 'up'});
  },

  postComment: function(){
    // if(this.props.session.isLoggedIn){
    //   // Begin Optimistic Update
    //   var comment = {
    //                   name: this.props.session.userInfo.username,
    //                   avatar: this.props.session.userInfo.avatar,
    //                   headline: this.props.session.userInfo.headline,
    //                   specialty_avatar_url: this.props.session.userInfo.specialty_icon,
    //                   reputation_count: 0,
    //                   content: this.state.commentText
    //                 }
    //   var comments = this.state.comments;
    //   var newComments = [comment].concat(comments);
    //   this.setState({comments: newComments});
    //   // End Optimistic Update
      
    //   // Begin Actual Post
    //   var data = {project_id: this.props.project.id, content: this.state.commentText};
    //   AppActions.postComment(data);
    //   this.setState({
    //     commentText: ''
    //   }, function() {
    //     // This code executes after the component is re-rendered
    //     React.findDOMNode(this.refs.commentText).focus();   // Boom! Focused!
    //   });
    //   // End Actual Post
    // } else {
    //   this.props.openSignIn();
    // }
  },

  render: function() {
    // console.log(this.props.comments)
    if (this.props.comments){
      var _this = this;
      var comments = this.state.comments.map(function(d, i){
        var upvoteClass = d.upvoted ? " upvoted" : "";
        return (
          <li id={d.id}>
            <div className="reviewer-info">
              <div style={{"display":"inline-block","position":"relative"}}>
                <Link to="expert" params={{username: d.name}} className="user_name">
                  <img alt={d.name} className="gravatar" height="40" src={d.avatar} style={{"marginRight": "0"}} width="40"/>
                </Link>
              </div>
              <div style={{"display": "inline-block", "verticalAlign": "middle", "marginLeft": "8px"}}>
                <div style={{"display": "inline"}}>
                  <p style={{"marginBottom": "0", "textAlign": "left"}}><Link to="expert" params={{username: d.name}} className="user_name"><b>{d.name}</b></Link></p>
                </div>
                <div style={{"display": "inline"}}>
                  <span className="meta">{d.headline}</span>
                </div>
              </div>
            </div>
            <div className="review-text" style={{padding:"10px 0 10px 10px", "display":"table"}}>
              <div className="upvote" onClick={_this.upvoteComment.bind(_this, d, i)}  style={{"display":"table-cell", "float":"none"}}>
                <span className={"upvote-arrow fa fa-chevron-up" + upvoteClass}></span>
                <span className="upvote-count">{d.reputation_count}</span>
              </div>
              <span style={{"display":"table-cell", "paddingLeft":"25px"}}><p style={{whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{__html: replaceAtMentionsWithLinks(replaceURLWithLinks(d.content))}}></p></span>
            </div>
            <div id="comment-control" className="comment-control" style={{"paddingLeft": "50px"}}>
              <a onClick={_this.replyUser.bind(_this, d.name)} className="button right-sm" style={{"cursor":"pointer"}}><i className="fa fa-reply"></i></a>
            </div>
          </li>
        );
      });
    }

    var loader =  <div style={{"width":"100%", "textAlign":"center", "paddingTop": "20px", "paddingBottom": "30px"}}>
                    <i className="fa fa-spinner fa-spin" style={{"color":"#999999", "fontSize": "150%"}}></i>
                  </div>;
    return (
      <div className="list rating-widget">
        <div style={{"marginTop":"15px"}}>
          <div style={{"background": "transparent", "padding": "0 0", "marginBottom": "10px"}}>
            <div className="form-group" style={{"marginBottom": "10px"}}>
              <div className="textoverlay-wrapper" style={{"margin": "0px", "padding": "0px", "overflow": "hidden", "display": "block", "position": "relative"}}>
                <textarea onChange={this.handleChange} ref="commentText" value={this.state.commentText} className="form-control" id="comment-box" autoComplete="off" style={{"position": "relative", "outline": "0px", "background": "transparent"}}></textarea>
              </div>
            </div>
            <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover>抱歉，此功能还未开放</Popover>}>
              <button onClick={this.postComment} className="btn btn-primary" name="button" type="submit">发布</button> 
            </OverlayTrigger>
          </div>
          {/*<ul>
            <div id="comment-list">
              <InfiniteScroll
                loader = {<Loader/>}
                loadMore = {this.props.loadMore}
                hasMore = {this.state.hasMore}>
                {comments}
              </InfiniteScroll>
            </div>
          </ul>*/}
        </div>
      </div>
    );
  }
});

module.exports = Comments;
