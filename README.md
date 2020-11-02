# SurfShop (working name)

### Marketplace for users to sell and buy surf gear.

To run this project on your machine:

- Clone this repository to your machine with `git clone`
- edit config in `src/components/Firebase/firebase.js` with your firebase api credentials (or better yet, set env variables in .env)
- run `npm install` and `npm start` in project root

## About - This project is currently "under development"

This project idea was pitched to me by my neighbor David, a reseller of surf equipment in his free time. The idea is to run a Poshmark-like marketplace that caters specifically to surf related gear. In it's infancy, the app is to act as a liaison between a buyer and seller, only making the connection and instead leaving the exchange of goods to the indiviuals involved in the transaction (think Craigslist, buyer contacts seller through anonymous email and then it's up to them to figure out the rest). As development continues, features such as in-app chat will be added - potentially leading up to payment being performed in-app if desired as well.

Unfortunately, David and I's focus has shifted and not much development has happened on the project in recent months. I still love the idea of the app, and plan to continue work when possible.

## Current status of the app

- This app was bootstrapped from Create-react-app.
- A majority of the main pages of the app have been created (not much layout or styling present).
- I'm making use of Google's Firebase platform: as of now I have implemented the api for:
  - Authentication
    - Current methods: Google account, username/password
    - Users must be signed in to message sellers, list items, etc.
  - Firestore
    - DB for all users, user posts, etc.
  - Storage
    - Storage for images users upload of the item being sold.

## Todo

- Recompose is a great library for easily making use of HOC's, but since the introduction of hooks, the libraries author has stopped development. Need to work on removing recompose from the project and converting all that logic to hooks.
- Since updating to MacOS Catalina, I've been having issues running this project with yarn. Have been using npm in the meantime, but need to look into this issue.
