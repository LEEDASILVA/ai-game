// contains the dna logic
const random = (min = 0, max = 1) =>
  Math.random() * (max - min) + min

const newChar = () => {
    r = Math.round(random(63, 122))
    if(r == 63) r = 32
    if(r == 64) r = 46
    return String.fromCharCode(r)
}
// module.exports.
const initDNA = (lengthPhrase) => {
  let genes = []

  for (let i = 0; i < lengthPhrase; i++) {
    genes[i] = newChar()
  }
  return {
    genes,
    fitness: 0,
    getPhrase() {
      return this.genes.join('')
    },
    calcFitness(target) {
      let score = 0
      for (let i = 0; i < this.genes.length; i++)
        this.genes[i] == target.charAt(i) && score++

      this.fitness = score / target.length
      
      this.fitness = Math.pow(this.fitness, 4)
    },
    crossover(partner) {
      let child = initDNA(this.genes.lengthPhrase)
      let midpoint = Math.floor(random(0, this.genes.length))

      // half form one and half from the other
      for (let i = 0; i < this.genes.length; i++) {
        if (i > midpoint) child.genes[i] = this.genes[i]
        else child.genes[i] = partner.genes[i]
      }
      return child
    },
    mutate(mutationRate) {
      for (let i = 0; i < this.genes.length; i++) {
        // TODO : check this here this may cause problems!!!
        if (random(0, 1) < mutationRate) {
          this.genes[i] = newChar()
        }
      }
    },
  }
}
