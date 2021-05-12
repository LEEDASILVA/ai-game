# Example folder

This folder has the examples of the algorithms that i'm using for the main project

## genetic algorithm

heredity:
    there must be a process in place by which children receive the properties

variation:
    there must be a variety of traits present in the population or a means with
    which to introduce variation

selection:
    there must be a mechanism by which some members of a population have the
    opportunity to be parents and pass down their genetic information and some
    do not. this is typically referred to as "survival of the fittest"

1. create a random population of N elements -> variation
2. calculate the fitness for N elements -> selection

- fitness can be the number of characters that fit the first word

```js
let fitness = words.map((v) => {
    let count = 0
    for(let i = 0; i < v.length; i++) {
        v[i] == word[i] && count++
    }
    return count
})
```

2.2. reproduction selection

- pick two parents (could be more or less) that are the more fit to reproduct

best way to pick them is to pick for the hole population using the fit as a score

[5, 1, 0, 4] -> [50%, 10%, 0%, 40%]

we can view this as a pie graph

```console
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
```

so the bigger the fitness the more probable is the parent to be selected

- once the 2 parents are selected we will make a new child

using crossover and mutation!

**crossover:**

split the parents to create a child

example :

some|one and some|body

some and body

joined:

result -> somebody

**mutation:**

if there is no variation you can apply mutation, in the child creation i can mutate one of the characters of the child

---

## Neural Network

The first project will contain a neural network that tries to guess the shape that you draw to the canvas

1. generate the data:

- `go run main.go`, this will create a folder named `data` with all the train data, it will include 3 shapes
  - circles
  - squares
  - triangles
- the it will generate 600 images 64*64 px
- each 200 of each

2. train the neural network, for this we will use the ml5 to create a image regression neural network, `sketch-model.js`

- inputs will be the width, height and the `RGBA`
- the epochs will be set to 70 this meaning that it will train 70 times

to run the training you must change the script of the html file to `sketch-model.js`

```js
    <script src="sketch-model.js"></script>
```

3. run the testing part for this you can open the `index.html` and try to draw the shape you want and the neural network will try to guess the shape
