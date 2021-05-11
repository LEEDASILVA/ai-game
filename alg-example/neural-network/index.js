let circles = []
let squares = []
let triangles = []
let shapeClassifier

// const preload = () => {
for (let i = 0; i < 100; i++) {
  circles[i] = `./data/circle${i}.png`
  squares[i] = `./data/square${i}.png`
  triangles[i] = `./data/triangle${i}.png`
}
// }

// const setup = () => {
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let image = document.createElement('img')
image.src = circles[0]
ctx.drawImage(image, 10, 10)

let options = {
  // width, height, color RGBA
  inputs: [100, 100, 4],
  // classification or regression, but we will use imageClassification
  task: 'imageClassification',
  debug: true,
}

shapeClassifier = ml5.neuralNetwork(options)
for (let i = 0; i < circles.length; i++) {
  shapeClassifier.addData({ image: circles[i] }, { label: 'circle' })
  shapeClassifier.addData({ image: squares[i] }, { label: 'square' })
  shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' })
}
shapeClassifier.normalizeData()
shapeClassifier.train({ epochs: 50 }, () => {
  console.log('finished training')
  shapeClassifier.save()
})
// }
