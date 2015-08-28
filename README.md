# Mortality

## Requirements
* Unix based Control Machine (Ansible Requirement)
* Git
* Ansible
* Vagrant

#### Ubuntu/Debian Pre-requisites

Most of the pre-requisists are available in the default Ubuntu repositories:

sudo apt-get install virtualbox vagrant
You need a recent version of Ansible (the Ansible package provided by Ubuntu is very old and does not support the debconf Ansible module). You can use pip (the Python package manager) to fetch the latest Ansible release:

```
sudo apt-get install python-pip
sudo pip install ansible
sudo ansible-galaxy install -r requirements.yml -f
```

#### OSX Pre-requisites

In order to test you must have the following installed:

Vagrant
Virtual Box
Ansible
A number of Ansible-Galaxy roles

Installing the Pre-requisites requires Homebrew and Homebrew Cask, if you don't have these using your terminal run the following:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
Installing the Pre-requisists:
```
```
brew cask install virtualbox
brew cask install vagrant
brew install ansible
sudo ansible-galaxy install -r requirements.yml -f
```

## Installation
1. Clone this repo git `clone https://github.com/compulsed/mortality.git`
2. Change to the repo root `cd mortality`
3. Install Ansible Galaxy roles `sudo ansible-galaxy install -r requirements.yml -f`
4. Start vagrant `vagrant up`
5. View the site at `http://localhost:9000`

## Common Problems
* The guest machine entereed an invalid state waiting for it to boot.  
https://github.com/cloudfoundry/bosh-lite/issues/220
-> Specifically the comment related to disabling the USB
