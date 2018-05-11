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

Server-side
* [Python flask](http://flask.pocoo.org/): simple webserver
* [SQLITE3](https://www.sqlite.org/index.html): simplest SQL server in the world

Client-side
* [Bootstrap 4.1](https://getbootstrap.com/): response pages and pretty components
* [jQuery](https://jquery.com/): Javascript utilities: selectors, AJAX requests
* [Slider Pips](http://simeydotme.github.io/jQuery-ui-Slider-Pips/): Pretty sliders


In addition we are loading a couple of flask extensions. 

These can be easily imported from a file [requirements.txt](/experiment/requirements.txt)
 and are read by [docker-compose.yml](/experiment/docker-compose.yml).

### Other resources
#### Docker
There's an excellent github with a [Docker Cheat Sheet](https://github.com/wsargent/docker-cheat-sheet) explaining all the useful bits. Below you'll also find some tips for installing docker.

[Windows 10](https://docs.docker.com/docker-for-windows/install/). 
Current version runs on 64bit Windows 10 Pro, Enterprise and Education (1607 Anniversary Update, Build 14393 or later).
Make sure Hyper-V is running and virtualization is enabled in the BIOS.
For older versions of windows you can try [Docker toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/
).

[Mac](https://docs.docker.com/docker-for-mac/install/). 
This requires a recent Mac (2010 - ).At a minimum, Docker for Mac requires macOS Yosemite 10.10.3 or newer, with the caveat that going forward 10.10.x is a use-at-your-own risk proposition. VirtualBox prior to version 4.3.30 must NOT be installed (it is incompatible with Docker for Mac). If you have a newer version of VirtualBox installed, it’s fine.
For older versions of windows you can try [Docker toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/
).

### Digital Ocean
If you would like to try this out on Digital Ocean, sign up using this [link](https://m.do.co/c/3c36249270c6). It will give you 10$ credit, and I'll get rewarded with credit as well for every person who signs up.


### Setting up SSH keys
The following instructions will help you setting up SSH keys to access your server on [Digital Ocean](https://www.digitalocean.com)
The instructions for [Windows](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users) explains how to set up the keys with [PuTTY and PuTTY-gen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). The procedure of Mac is quite simple, and is explained on [this page](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets
).


To use SSH on Windows there are a couple of options. Recent versions of Windows 10 would allow you to do this easily by
enabling a [feature in the settings](https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/
) to use built-in SSH commands. Alternatively, you might have git-bash installed, which would allow you to this from the command line or
you can use the Digital Ocean console to ssh in.


### Uploading your files to the server
This is straightforward on Linux and Mac, using commands like rsync. For Windows there are a couple of other options.
One of them is using SFTP and [FileZilla](https://filezilla-project.org/).  This will also require you to enter your private key into Filezilla to set up a secure connection. The steps are outlines in this [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-filezilla-to-transfer-and-manage-files-securely-on-your-vps).

If rsync is installed, you can do
```Shell
rsync -r -e ssh ./experiment root@[DROPLET-IP]:~/
```

