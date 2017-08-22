import React from 'react'


export default class ScratchPad extends React.Component {
	constructor() {
		super()

		console.log("called")

	}
	render() { return  <div /> }
}






















		// console.log("scratchpad constructor")

		// this.counter = 0;
		// var audioCtx = new AudioContext();

		// // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
		// var scriptNode = audioCtx.createScriptProcessor(512, 1, 1);
		// console.log(scriptNode.bufferSize);



		// // Give the node a function to process audio events
		// scriptNode.onaudioprocess = function(audioProcessingEvent) {

		// 	var output = audioProcessingEvent.outputBuffer.getChannelData(0);
		// 	for (var i = 0; i < output.length; i++) {
		// 		output[i] = Math.random();
		// 	}
			
		// }

		// // scriptNode.connect(audioCtx.destination);