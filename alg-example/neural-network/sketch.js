let shapeClassifier
let clearButton
let resultDiv
let inputImage
let canvas

function setup() {
  canvas = createCanvas(400, 400)

  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true,
  }

  shapeClassifier = ml5.neuralNetwork(options)

  background(244)
  clearButton = createButton('clear')
  clearButton.mousePressed(() => background(255))
  resultDiv = createDiv('loading model')
  inputImage = createGraphics(64, 64)

  shapeClassifier.load(
    {
      model: 'model/model.json',
      metadata: 'model/model_meta.json',
      weights: 'model/model.weights.bin',
    },
    () => {
      console.log('model ready!')
      classifyImage()
    }
  )
}

function classifyImage() {
  // copy a image from the canvas to another region of the canvas
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64)
  image(inputImage, 0, 0)
  shapeClassifier.classify({ image: inputImage }, (err, res) => {
    if (err) {
      console.err(err)
      return
    }
    let confidence = nf(100 * res[0].confidence, 2, 0)
    resultDiv.html(`${res[0].label} ${confidence}%`)
    classifyImage()
  })
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8)
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}
