# Mortality v2

## Requirements
* Unix based Control Machine (Ansible Requirement)
* Git
* Ansible
* Vagrant (+ Virtualbox)

#### Ubuntu/Debian Pre-requisites

Virtualbox is available in the default Ubuntu repositories:

```sh
sudo apt-get install virtualbox
```

The latest version of Vagrant is available as a deb package at `http://www.vagrantup.com/downloads.html`

You need a recent version of Ansible (the Ansible package provided by Ubuntu is very old and does not support the debconf Ansible module). You can use a ppa to install Ansible.

```sh
sudo apt-get install software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible
sudo ansible-galaxy install -r requirements.yml -f
```

#### OSX Pre-requisites

In order to test you must have the following installed:

Vagrant
Virtual Box
Ansible
A number of Ansible-Galaxy roles

Installing the Pre-requisites requires Homebrew and Homebrew Cask, if you don't have these using your terminal run the following:

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
```

Installing the Pre-requisists:
```sh
brew cask install virtualbox
brew cask install vagrant
brew install ansible
sudo ansible-galaxy install -r requirements.yml -f
```

## Installation - Ansible/Vagrant
1. Clone this repo `git clone https://github.com/compulsed/mortality.git`
2. Change to the repo root `cd mortality`
3. Install Ansible Galaxy roles `sudo ansible-galaxy install -r requirements.yml -f`
4. Start vagrant `vagrant up`
5. View the site at `http://localhost:9000`

## Installation Heroku
#### Pre-requisists
- Heroku toolbelt installed
- Node and NPM installed [Latest](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager?utm_source=%5Bdeliciuos%5D&utm_medium=twitter)
- Yeoman & Grunt cli `sudo npm install -g grunt-cli yo bower generator-angular-fullstack`

#### Installation
0. Login to Heroku `heroku login`
1. Clone this repo `git clone https://github.com/Compulsed/Mortality.git`
2. Change into the repo `cd Mortality`
3. Run `npm install && bower install`
4. Run `grunt build`, builds the application into the dist folder
5. Run `cd dist`
6. Run `yo angular-fullstack:heroku` to create the application on heroku
7. Run `heroku addons:create mongolab` to get mongo working

Alternatively you can specify your own mongoDB `heroku config:set "MYMONGO_URI=$YOUR_MONGOURL"`

#### Pushing Updates
1. Change back into the root directory of the application
2. Run `grunt build`, builds the application into the dist folder
3. Commits and pushes the local build to heroku `grunt buildcontrol:heroku`
4. Follow Migrate Database steps if there is a DB Migration

## Migrating Database
#### Creating new migration
```sh
node ./node_modules/mongodb-migrate -runmm create <migration name>
```

#### Upgrading the database
```sh
node ./node_modules/mongodb-migrate -dbn mortality-dev -runmm up
```

#### Downgrading the database
```sh
node ./node_modules/mongodb-migrate -dbn mortality-dev -runmm down <version no or migration file>
```

## Common Problems
* The guest machine entereed an invalid state waiting for it to boot.  
https://github.com/cloudfoundry/bosh-lite/issues/220
-> Specifically the comment related to disabling the USB
