// contains the logic of the population
// const dna = require("./dna");

const fillPop = (nbrPopulation, size) => {
  let result = []
  for (let i = 0; i < nbrPopulation; i++) {
    result[i] = initDNA(size)
  }
  return result
}

const mapValues = (target, targetMax) => ((target * 100) / targetMax) * 100

const initPop = (phrase, mutation, nbrPopulation) => {
    let population = fillPop(nbrPopulation, phrase.length)
  let pop = {
    population,
    matingPool: [],
    generation: 0,
    finished: false,
    target: phrase,
    mutationRate: mutation,
    perfectScore: 1,
    best: '',

    calcFitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness(phrase)
      }
    },

    naturalSelection() {
      this.matingPool = []
      let maxFitness = 0
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > maxFitness) {
          maxFitness = this.population[i].fitness
        }
      }

      // each member will get added to the mating pool
      // higher fitness means more entries
      // lower fitness means less entries
      for (let i = 0; i < this.population.length; i++) {
        let fitness = mapValues(this.population[i].fitness, maxFitness)

        for (let j = 0; j < fitness; j++) {
          this.matingPool.push(this.population[i])
        }
      }
    },

    // new generation, fill the population with children from the mating pool
    generate() {
      for (let i = 0; i < this.population.length; i++) {
        let a = Math.floor(random(0, this.matingPool.length))
        let b = Math.floor(random(0, this.matingPool.length))
        let partnerA = this.matingPool[a]
        let partnerB = this.matingPool[b]
        let child = partnerA.crossover(partnerB)
        child.mutate(this.mutationRate)
        this.population[i] = child
      }
      this.generations++
      console.log(this.generation)
    },

    getBest() {
      return this.best
    },

    evaluate() {
      let worldrecord = 0.0
      let index = 0
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > worldrecord) {
          index = i
          worldrecord = this.population[i].fitness
        }
      }

      this.best = this.population[index].getPhrase()
      if (worldrecord === this.perfectScore) {
        this.finished = true
      }
    },

    isFinished() {
      return this.finished
    },

    getGeneration() {
      return this.generation
    },

    getAverageFitness() {
      sum = this.population.reduce((acc, cr) => acc + cr)
      return sum / this.population.length
    },

    allPhrases() {
      let result=''
      let displayLimit = 30
      for (let i = 0; i < displayLimit; i++) {
        result += this.population[i].getPhrase() + '<br>'
      }
      return result
      // return this.population.reduce((acc, cr, i) => {
      //     acc += cr.getPhrase()+ '<br>'
      //   if (i == displayLimit) {
      //       return acc
      //   }
      // })
    },
  }
  pop.calcFitness()
  return pop
}
