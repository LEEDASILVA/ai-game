let circles = []
let squares = []
let triangles = []

function preload() {
  console.log('loading.....')
  for (let i = 1; i <= 200; i++) {
    circles[i] = loadImage(`./data/circle${i}.png`)
    squares[i] = loadImage(`./data/square${i}.png`)
    triangles[i] = loadImage(`./data/triangle${i}.png`)
  }
}

let shapeClassifier
function setup() {
  createCanvas(400, 400)
  // let canvas = document.getElementById('canvas')
  // let ctx = canvas.getContext('2d')

  let options = {
    // width, height, color RGBA
    inputs: [64, 64, 4],
    // classification or regression, but we will use imageClassification
    task: 'imageClassification',
    debug: true,
  }

  shapeClassifier = ml5.neuralNetwork(options)
  for (let i = 1; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' })
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' })
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' })
  }
  shapeClassifier.normalizeData()
  shapeClassifier.train({ epochs: 70 }, () => {
    console.log('finished training')
    shapeClassifier.save()
  })
}
