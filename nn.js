// For now we will use brain.js because its a GPU accelerated neural networks
// for the browser

// but would like to implement the neurons and the network by my self
// this could help <https://dev.to/rafinskipg/writing-a-neural-network-in-javascript-2020-intro-to-neural-networks-2c4n>

// here is the graph of the algorithm that i'm implementing
// <https://miro.medium.com/max/474/0*eydAywp8fITbboo0.>
const net = new brain.NeuralNetworkGPU();

const xorTrainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

net.train(xorTrainingData);

console.log(net.run([0, 0]));
console.log(net.run([0, 1]));
console.log(net.run([1, 0]));
console.log(net.run([1, 1]));
