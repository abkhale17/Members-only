Run app on your local machine
## Installation
Install the dependencies
```sh
$ npm install
```
Run app
```sh
$ npm run devstart
```
# Objective
Build Nodejs app "Members only Club - Roast Non-club Members"
> From The Odin Project's [curricullum](https://www.theodinproject.com/courses/nodejs/lessons/members-only)

## About this Web App and Club
An exclusive clubhouse where your members can write embarrassing posts about non-members. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Some bullet Features
- All member messages are displayed on Home page
    - only show the author and date of the messages to other club-members.
- Sign Up to create account
    - JOIN THE CLUB by entering secret admin password ( pw: iamadmin)
- Club-Members can Create a new message only if they are LOGGED IN
- Only Admin can delete messages
    - Mark user as a admin by providing checkbox IS ADMIN while Signing Up (for sake of simplicity)

## Member and Non-member Accounts for testing
* **Non-member (Only can view messages but not who posted it)**
    - *username*  :  skyler
    - *password*  :  skyler
* **Club member but not Admin (can view who posted msg, can create messages)**
    - *username*  :  jesse
    - *password*  :  jesse
* **Club member and Admin ( can delete messages)**
    - *username*  :  walter
    - *password*  :  walter
