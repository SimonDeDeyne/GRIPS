# GRIPS
This repository contains a few simple examples on how to use Docker to develop simple experiments.

## Static Html
[Example_1](/example_1): simple example in which we will serve a static html file.

[Example_2](/example_2): extend Example 1 to attach a data volume and demonstrate css


## AoE Experiment
[Experiment](/experiment): A simple questionnaire style experiment

### Structure
1. Obtain consent
2. Register participant information
3. Display instructions on screen
4. Present survey questions in random order
5. Write results to file

### Details
This experiment requires on following components:
Server-side:
* Python flask


In addition we are loading a couple of flask extensions. 
These can be easily imported from a file [requirements.txt](/experiment/requirements.txt)
 and are read by [docker-compose.yml](/experiment/docker-compose.yml).
