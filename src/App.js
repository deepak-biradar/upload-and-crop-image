import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadAndCropComponent from "./components/uploadAndCropComponent";
import FormComponent from "./components/formComponent";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
        this.onCropHandle = this.onCropHandle.bind(this);
        this.onDeleteHandle = this.onDeleteHandle.bind(this);
    }
    onCropHandle(image) {
        this.setState({ image });
    }
    onDeleteHandle() {
        this.setState({ image: null });
    }
    render() {
        return (
            <div>
                <div className="App">
                    <header className="App__header">
                        <img src={logo} className="App__header__logo" alt="logo" />
                        <h1 className="App__header__title">Simple React App</h1>
                    </header>
                </div>
                <div className="upload-image-main-wrapper">
                    <div className="row">
                        <div className="col-sm-12 col-md-8">
                            <UploadAndCropComponent 
                                onCropHandler={this.onCropHandle} 
                                onDeleteHandler={this.onDeleteHandle}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <FormComponent image={this.state.image}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;