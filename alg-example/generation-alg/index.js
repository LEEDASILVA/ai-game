/*
heredity:
    there must be a process in place by which children receive the properties

variation:
    there must be a variety of traits present in the population or a means with
    which to introduce variation

selection:
    there must be a mechanism by which some members of a population have the
    opportunity to be parents and pass down their genetic information and some
    do not. this is typically referred to as "survival of the fittest"

example:

word="unicorn"

1- create a random population of N elements -> variation

let words = ['unijorm', 'pancake', 'aaaaaah', 'popcorn']

2- calculate the fitness for N elements -> selection
2.1
for this example the fitness can be the number of characters that fit the first word

let fitness = words.map((v) => {
    let count = 0
    for(let i = 0; i < v.length; i++) {
        v[i] == word[i] && count++
    }
    return count
})

console.log(fitness)
// [5, 1, 0, 4]

2.2 reproduction selection

- pick two parents (could be more or less) that are the more fit to reproduct

best way to pick them is to pick for the hole population using the fit as a score

[5, 1, 0, 4] -> [50%, 10%, 0%, 40%]

we can view this as a pie graph

   ..........
  ............
 ..............
................
................
@@@@@@@@$$$$$$$$
@@@@@@@@@@$$$$$$
 @@@@@@@@@$$$$$
  @@@@@@@@@@@$
    @@@@@@@@

. -> unijorm
@ -> popcorn
$ -> pancake

so the bigger the fitness the more probable is the parent to be selected

- once the 2 parents are selected we will make a new child

using crossover and mutation!

crossover:

split the parents to crate a child

uni|jorm and pop|corn

uni and corn

    join

result -> unicorn

mutation:
if there is no variation you can apply mutation

in the child creation i can mutate one of the characters of the child
*/
let target
let popmax
let mutationRate
let population

let bestPhrase = document.getElementById('best-phrase')
let allPhrases = document.getElementById('all-phrases')
let stats = document.getElementById('stats')
let p = document.getElementById('best-phrase-input')

const init = () => {
    let phrase = 'To be or not to be.'
    p.innerHTML += phrase

    popmax = 200
    mutationRate = 0.01

    // create population
    population = initPop(phrase, mutationRate, popmax)
    console.log(population)
}

const draw = () => {
    population.naturalSelection()
    population.generate()
    population.calcFitness()

    population.evaluate()

    displayInfo()
    if(!population.isFinished()) {
        window.requestAnimationFrame(draw)
    } else {
        console.log('done')
    }
}
const displayInfo = () => {
    let answers = population.getBest()

    p.innerHTML= `Best phrase:<br> ${answers}`

    allPhrases.innerHTML = `all phrases(limit: set to 30): <br> ${population.allPhrases()}`

    stats.innerHTML = `<br>total generations:  ${population.getGeneration()}<br>
    average fitness:  ${population.getAverageFitness()} <br>
    total population:  ${popmax}<br>
    mutation rate:  ${mutationRate}% <br>`

}

const start = () => {
    init()
    window.requestAnimationFrame(draw)
}