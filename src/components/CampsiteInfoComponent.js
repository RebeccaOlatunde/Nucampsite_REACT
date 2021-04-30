import React from 'react';
import {Modal, ModalHeader, ModalBody, Form, Label, Card, CardImg,  CardText, CardBody, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
​

class CommentForm extends React.Component {
​
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleSubmitComment.bind(this);
    }
​
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
​
    handleSubmitComment(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
​
  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
             <i className='fa fa-pencil fa-lg'/> Submit Comment
        </Button>
​
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={this.handleSubmitComment}>
                <div className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                        <Control.select className="form-control" model='.rating' id="rating" name="rating" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                </div>
                <div className="form-group">
                    <Label htmlFor="author">Author</Label>
                        <Control.text className="form-control" model='.author' id="author" name="author"                        validators = {{
                            required, 
                            minLength: minLength(2),
                            maxLength: maxLength(15),
                            }}>
                            
                        </Control.text>
                        <Errors
                            className='text-danger'
                            model='.author'
                            show='touched'
                            component='div'
                            messages={{
                                required: 'Required',
                                minLength: 'Must be at least 2 characters.',
                                maxLength: 'Must be at most 15 characters'
                               }}
                        />
                </div>
                <div className="form-group">
                    <Label htmlFor="text">Text</Label>
                        <Control.textarea className="form-control" model='. 
                             text' id="text" name="text">
                        </Control.textarea>
                </div>
                <Button type='submit' value='submit' color='primary'>Submit</Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </React.Fragment>
        )
    };
 }
​
  function RenderCampsite({campsite}){
    return(
      <div className = 'col-md-5 col-m1'>
         <Card>
         <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
              <CardBody>
                <CardText>{campsite.description}</CardText>
              </CardBody>
            </Card>
      </div> 
    )
  }
​
function RenderComments({comments, postComment, campsiteId}) {      
       if(comments) {
            return <div class='col-md-5 col-m1'>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (<div key= {comment.id}>
                        <p>{comment.text}
                        <br/> 
                        {comment.author}
                         {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>)
                })}
            <CommentForm campsiteId={campsiteId} postComment={postComment}/>
            </div>
        }
    }
​
    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
      if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row"> 
                  <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />                 
                </div>
            </div>
        );
      } 
        return <div />;
    }
​
export default CampsiteInfo;



