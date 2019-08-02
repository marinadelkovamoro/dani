import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";
import Palette from "../Palette"
import './Sketch.css';
import API from "../../utils/API"
import withAuth from './../withAuth';

class Sketch extends Component {
    state = {
        color: "rgba(155,50,160,0.7)",
        width: 1000,
        height: 800,
        brushRadius: 5,
        lazyRadius: 1,
        metricID: "",
        metrics: []
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                metricID: res.data.metric
            })
            let pageOn = this.props.history.location.pathname.replace("/", "")
            API.addToMetrics(res.data.metric, pageOn)
        });
    }

    chooseColor = color => {
        this.setState({ color: color })
    };

    brushSizeUp = () => {
        if (this.state.brushRadius < 20) {
            this.setState({ brushRadius: this.state.brushRadius + 1 })
        }
    }
    brushSizeDown = () => {
        if (this.state.brushRadius > 1) {
            this.setState({ brushRadius: this.state.brushRadius - 1 })
        }
    }

    loadDrawing = () => {
        API.loadDrawing()
            .then(data => {
                if (data.data[data.data.length - 1].drawing) {
                this.saveableCanvas.loadSaveData(
                    data.data[data.data.length-1].drawing
                )
                }
            })
        // for (let i = 0; i < localStorage.length; i++){
        //     console.log(localStorage)
        //     // do something with localStorage.getItem(localStorage.key(i));
        // }
        // this.saveableCanvas.loadSaveData(
        //     localStorage.getItem("savedDrawing")
        // );

    }

    saveDrawing = () => {
        // let saveNameRandom = toString(Math.random(100))
        let saveNameRandom = "test save"
        // localStorage.setItem(
        //     saveNameRandom,
        //     this.saveableCanvas.getSaveData()
        // );
        API.saveDrawing(saveNameRandom, this.saveableCanvas.getSaveData())
    }

    render() {
        return (
            <div className=" text-center">
                <h2 className="pangolin-text" onClick={() => this.saveDrawing()}>Save Drawing</h2>
                <h1 className="pangolin-text-title"> Let's Draw!</h1>
                <h2 className="pangolin-text load-text" onClick={() => this.loadDrawing()}>Load a Drawing</h2>
                <button className="undo-button pangolin-undo"
                    onClick={() => {
                        this.saveableCanvas.undo();
                    }}
                >Oops! -<i className="fa fa-eraser"></i>- Undo</button>
                <div className="d-flex draw-area">
                    <CanvasDraw
                        hideGrid
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        // ref1={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={""}
                        brushColor={this.state.color}
                        canvasHeight={window.outerHeight || this.state.height}
                        canvasWidth={(window.outerWidth - 135) || this.state.width}
                        lazyRadius={this.state.lazyRadius}
                        brushRadius={this.state.brushRadius}
                    // imgSrc="https://i.pinimg.com/originals/1e/93/95/1e9395f5e6a120b92f3b6546c13fda6a.png"
                    />
                    <Palette
                        undo={this.undoButton}
                        colorClick={this.chooseColor}
                        brushSizeUp={this.brushSizeUp}
                        brushSizeDown={this.brushSizeDown}
                    />
                </div>
            </div>
        )
    }
}


export default withAuth(Sketch);