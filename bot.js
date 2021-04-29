/*
BOT

the basics of the bot is to survive the lost possible
it will be given food and this food can be processes as energy so that they can
continue with the reproduction and create new generations....

This will work the following way:

inputs :
    - state (constant, hungri, maturity, health, speed)
    - vision (distance to close food, angle to food, )
    - pheromones (????)
    - clock (time alive)

outputs :
    - movement (forward, back, left, right)
    - wants (generate new child, eat, grab)
    - biological (??????)

this using neural networks, **AI-branch helped**

Energy calculations: speed ratio / 2*size ratio

genes are a table with all genes with numbers (percent of each gene in the genes)
It will accure a mutation that will change for each on of the bots

bots brains:

the brains will be a neural network

thinking of using NEAT (neural evolution of augmenting topologies) <https://towardsdatascience.com/neat-an-awesome-approach-to-neuroevolution-3eca5cc7930f>
but for now will use fixed input hidden and output layers.
*/