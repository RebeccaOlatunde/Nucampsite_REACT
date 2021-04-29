import React from 'react';
import {Modal, ModalHeader, ModalBody, Form, Label, Card, CardImg,  CardText, CardBody, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
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
      this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
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
           <CardImg top src={campsite.image} alt={campsite.name} />
              <CardBody>
                <CardText>{campsite.description}</CardText>
              </CardBody>
            </Card>
      </div> 
    )
  }
​
  function RenderComments({comments, addComment, campsiteId}) {
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
            <CommentForm />
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
                    addComment={props.addComment}
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



// import React from 'react';
// import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import {Control, LocalForm, Errors, controls} from "react-redux-form"
// import { Link } from 'react-router-dom';
// import ModalHeader from 'reactstrap/lib/ModalHeader';

// // const maxLength = len => !val || (val.length <= len);
// // const minLength = len => val => val && (val.length >= len);

// class CommentForm extends React.Component{
//  constructor(props){
//     super(props);

//     this.state ={
//       rating:"",
//       author:"",
//       text:"",
//       isModalOpen: false
//     };
//     this.toggleModal = this.toggleModal.bind(this);
//     this.handleLogin = this.handleSubmitComment.bind(this);
//   } 

//   toggleModal(){
//     this.setState({
//       isModalOpen: !this.state.isModalopen});
//   }

//   handleSubmitComment(event){
//     alert('Rating: ${this.rating.value} Author:${this.author.value} Text: ${this.text.check}')
//     this.toggleModal();
//     event.preventDefault();
//   }

//    render(){
//      return ( 
//         <Button outline onClick={this.toggleModal}><i className = "fa fa-lg fa-pencil"/>Submit Comment</Button>

//         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
//         <ModalHeader>Submit Comment</ModalHeader>
//         <ModalBody>
//            <LocalForm onSubmit={this.handleSubmitComment}>
//              <div className = "form-group">
//                <label htmlFor = "rating"> Rating </label>
//                   <control.select className= "form-control" model=".rating" id="rating" name="rating" placeholder="1">
//                      <option value = "1">1</option>
//                      <option value = "2">2</option>
//                      <option value = "3">3</option>
//                      <option value = "4">4</option>
//                      <option value = "5">5</option>
//                   </control.select>
//             </div>

//            <div className="form-group">
//               <label htmlFor="author">Your Name</label>
//                 <control.textarea className="form-control" model = ".author"
//                     name =".author" placeholder="Your Name" validators={{minLength:minLength(2), maxLength:maxLength(15)}}>
//                 </control.textarea>
//           </div>

//           <div className="form-group">
//              <Label htmlFor= "text">Text</Label>
//               <control.textarea className="form-control" model=".text" id="text" name="text"></control.textarea>
//           </div>
//           <Button type = "submit" value = "submit" color="primary">Submit</Button>
//         </LocalForm>
//         </ModalBody>
//         </ModalBody>
//         </Modal>
//       )
//     }
//   }
// }

//   function  RenderCampsite({campsite}) {
//     return (
//       <div className="col-md-5 col-m1 ">
//         <Card>
//           <CardImg top src={campsite.image} alt={campsite.name} />
//           <CardBody>
//             <CardText>{campsite.description}</CardText>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   }
     
//   function RenderComments({comments}) {
//     if (comments) {
//       return (
//         <div className="col-md-5 m-1">
//           <h4>Comments</h4>
//           {comments.map((comment) => {
//             return (
//               <div key={comment.id}>
//                 <p>
//                   {comment.text}
//                   <br />
//                   -- {comment.author},{" "}
//                   {new Intl.DateTimeFormat("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "2-digit",
//                   }).format(new Date(Date.parse(comment.date)))}
//                 </p>
//               </div>
//             );
//           })}
//           <commentForm/>
//         </div>
//       );
//     }
//   }

//   function CampsiteInfo(props) {
//     if (props.campsite) {
//         return (
//           <div className="container">
//                 <div className="row">
//                     <div className="col">
//                         <Breadcrumb>
//                             <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
//                             <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
//                         </Breadcrumb>
//                         <h2>{props.campsite.name}</h2>
//                         <hr />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <RenderCampsite campsite={props.campsite} />
//                     <RenderComments comments={props.comments} />
//                 </div>
//             </div>
//         );
//     }
//     return <div />;
// 

// export default CampsiteInfo;