# Mortality

## Requirements
* Unix based Control Machine (Ansible Requirement)
* Git
* Ansible
* Vagrant

## Installation
1. Clone this repo git `clone https://github.com/compulsed/mortality.git`
2. Change to the repo root `cd mortality`
3. Install Ansible Galaxy roles `sudo ansible-galaxy install -r requirements.yml -f`
4. Start vagrant `vagrant up`
5. View the site at `http://localhost:8000`

## Common Problems
* The guest machine entereed an invalid state waiting for it to boot.  
https://github.com/cloudfoundry/bosh-lite/issues/220
-> Specifically the comment related to disabling the USB