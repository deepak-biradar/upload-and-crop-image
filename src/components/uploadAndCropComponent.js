import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ReactAvatarEditor from 'react-avatar-editor';
import './uploadAndCropComponent.css';

export default class UploadAndCropComponent extends Component {
    constructor(props) {
        super(props);
        this.state= {
            imageAdded: false,
            slider: 1,
            preview: null,
            width: 300,
            height: 300,
            rotate: 0
        };
        this.handleDrop = this.handleDrop.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onClickCrop = this.onClickCrop.bind(this);
        this.setEditorRef = this.setEditorRef.bind(this);
        this.onClickRotate = this.onClickRotate.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    handleDrop = dropped => {
        this.setState({ image: dropped[0], imageAdded: true });
    }
    onSliderChange = e => {
        this.setState({ slider: parseFloat(e.target.value) });
    }
    setEditorRef = editor => {
        if (editor) this.editor = editor;
    }
    onClickRotate = e => {
        this.setState({ rotate: this.state.rotate + 90 });
    }
    onClickCrop = e => {
        if(!this.state.imageAdded) return;
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()

        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.slider,
                width: 250,
                height: 250,
                borderRadius: 2,
            },
        });
        this.props.onCropHandler(img);
    }
    onClickDelete = e => {
        this.setState({ imageAdded: false, preview: null });
        this.props.onDeleteHandler();
    }
    
    render() {
        const dragDropEle = (
            <Dropzone
                accept=".jpeg,.jpg,.png"
                className={"drop-zone"}
                onDrop={this.handleDrop}
                style={{ width: `${this.state.width}px`, height: `${this.state.height}px` }}
                > 
                <div className="drop-zone__thumbnail">Click here or Drag an image here</div>
            </Dropzone>
        );
        const avatarEditorEle = (
            <ReactAvatarEditor 
                ref={this.setEditorRef}
                width={this.state.width - 40} 
                height={this.state.height - 40} 
                image={this.state.image} 
                scale={this.state.slider}
                rotate={this.state.rotate}
            />
        )
        let ele;
        if(this.state.imageAdded) {
            ele = avatarEditorEle;
        } else {
            ele = dragDropEle;
        }
        return (
            <div className="upload-crop-component-wrapper row">
                <div className="col-sm-12 col-md-6">
                    <div className="upload-crop-component-wrapper__image">
                        {ele}    
                    </div>
                    <div className="upload-crop-component-wrapper__config">
                        <span className="item">Zoom:</span>
                        <input type="range" className="item slider" min="0.5" max="10.5" step="0.1" value={this.state.slider} onChange={this.onSliderChange} />
                        <i className="fa fa-repeat item icon" title="Rotate Image" onClick={this.onClickRotate}></i>
                        <i className="fa fa-crop item icon" title="Crop Image" onClick={this.onClickCrop}></i>
                        <i className="fa fa-trash-o item icon" title="Delete Image" onClick={this.onClickDelete}></i>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 upload-crop-component-wrapper__preview">
                    <div>Preview</div>
                    {this.state.imageAdded && !!this.state.preview && (
                        <img
                            src={this.state.preview.img}
                            alt=""
                        />
                    )}
                </div>
            </div>
        );
    }
}