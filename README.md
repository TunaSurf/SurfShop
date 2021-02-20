# SurfShop (working name)

### Marketplace for users to sell and buy surf gear.

To run this project on your machine:

- Clone this repository to your machine with `git clone`
- edit config in `src/shared/firebase/index.js` with your firebase api credentials (or better yet, set env variables in .env)
- run `yarn install` and `yarn start` in project root

## Current status of the app

- This app was bootstrapped from my create-react-app template, react-firebase-template.
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
