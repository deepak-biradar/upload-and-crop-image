import React, { Component } from 'react';
import ShowNotification from "./showNotification"

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.state = {
            showNotification: false,
            classname: null,
            message: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.image) {
            this.setState({ showNotification: false });
        }
    }
    onClickSubmit(e){
        e.preventDefault();
        const name = this.refs.imageName.value;
        this.setState({ showNotification: true });
        if(!this.props.image) {
            this.setState({ classname: "danger", message: "Image not uploaded or cropped" });
        } else if(!name){
            this.setState({ classname: "danger", message: "Please enter name of the Image" });
        } else {
            this.setState({ classname: "success", message: "Form submited successfully" });
        }
        //TODO: Need to add code to send the data to server
    }
    render() {
        return (
            <div className="upload-image-form-wrapper">
                <h2>Upload Image Form</h2>
                <form action="/action_page.php">
                    <div className="form-group">
                        <label>Name:</label>
                        <input ref="imageName" type="text" className="form-control" placeholder="Enter Name for the Image" name="name" required/>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea className="form-control rounded-0" rows="3" placeholder="Enter description" name="description"></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default" onClick={this.onClickSubmit}>Submit</button>
                    </div>
                    <ShowNotification 
                        showNotification={this.state.showNotification}
                        classname={this.state.classname}
                        message={this.state.message}
                    />
                </form>
            </div>
        );
    }
}