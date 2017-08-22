import React from 'react';
import '../styles.css'

import { Entity } from './Entity'

export default class CanvasComponent extends React.Component {

    constructor(props) {
        super(props);

        this._resizeHandler = () => {

            /* Allows CSS to determine size of canvas */
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;

            this.isValid = false
        }

        
        this.renderFrame = this.renderFrame.bind(this);
        this.draw = this.draw.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.highlightEntity = this.highlightEntity.bind(this);

        this.entities = []
        this.selectedEntity = null
        this.dragOffsetX = 0
        this.dragOffsetY = 0
        this.isDragging = false
        this.isValid = true
    }

    componentDidMount() {
        window.addEventListener('resize', this._resizeHandler);

        /* Allows CSS to determine size of canvas */
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        requestAnimationFrame(this.renderFrame);

        this.isValid = false
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.secondRect !== prevProps.secondRect) {
            this.isValid = false;   
        }
    }

    renderFrame() {
        requestAnimationFrame(this.renderFrame);
        if (!this.isValid) { this.draw() }
        
    }

    addEntity(x,y,w,h,fill) {

        const entity = new Entity(x,y,w,h,fill)
        this.entities.push(entity);
        this.isValid = false;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) { console.log("no context?") ; return }

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var self = this;

        this.entities.forEach(e => {

            ctx.fillStyle = e.fill;

            
            ctx.fillRect(
                e.x * ctx.canvas.clientWidth, 
                e.y * ctx.canvas.clientHeight, 
                e.w * ctx.canvas.clientWidth, 
                e.h * ctx.canvas.clientHeight
                );

            if (e == this.selectedEntity) {
                self.highlightEntity(ctx, e)
            }
        })
        this.isValid = true;
    }


    highlightEntity(ctx, entity) {

        ctx.strokeStyle = '#CC0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            entity.x * ctx.canvas.clientWidth,
            entity.y * ctx.canvas.clientHeight,
            entity.w * ctx.canvas.clientWidth,
            entity.h * ctx.canvas.clientHeight
            );
    }

    // EVENTS
    handleMouseMove(e) {

        if (this.isDragging) {

            const point = this.getMouse(e)
            this.selectedEntity.x = point.x - this.dragOffsetX
            this.selectedEntity.y = point.y - this.dragOffsetY
            this.isValid = false;    
        }
        

    }


    handleMouseDown(e) {

        const point = this.getMouse(e)

        e.preventDefault();

        this.entities.reverse().forEach(e => {

            if (e.contains(point.x, point.y)) {
                this.selectedEntity = e
                this.dragOffsetX = point.x - e.x
                this.dragOffsetY = point.y - e.y
                this.isDragging = true
                this.isValid = false
                return
            }
        })
    }

    handleMouseUp(e) {

        this.isDragging = false
    }

    handleDoubleClick(e) {

        const x = (e.clientX - e.target.offsetLeft) / this.canvas.clientWidth
        const y = (e.clientY - e.target.offsetTop) / this.canvas.clientHeight

        const width = 0.1
        const height = 0.2

        const rando1 = getRandom()
        const rando2 = getRandom()
        const rando3 = getRandom()

        function getRandom() {
            return Math.floor((Math.round(Math.random() * 10) / 10) * 255)
        }

        const fillColorString = "rgb(" 
        + rando1 + ","
        + rando2 + ","
        + rando3 + ")"
        console.log(fillColorString)

        this.addEntity(
            x - width / 2,
            y - height / 2,
            width,
            height,
            fillColorString
            )
    }





    //HELPERS


    getMouse(e) {

        const x = (e.clientX - e.target.offsetLeft) / this.canvas.clientWidth
        const y = (e.clientY - e.target.offsetTop) / this.canvas.clientHeight

        return {
            x: x,
            y: y
        }
    }






    render() {
        return (
            <canvas 
            onMouseMove={this.handleMouseMove} 
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onDoubleClick={this.handleDoubleClick}
            className="myCanvas" 
            ref={ canvas => this.canvas = canvas } 
            />
            );
    }

}
