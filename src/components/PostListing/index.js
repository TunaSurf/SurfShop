import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import cuid from "cuid";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { LISTING_ATTRIBUTES } from "../../constants/listing";
import { AuthUserContext } from "../Session";
import FileUpload from "../FileUpload";

function PostListing() {
  return (
    <div>
      <h1>Post Listing</h1>
      <AuthUserContext.Consumer>
        {authUser => <PostListingForm authUser={authUser} />}
      </AuthUserContext.Consumer>
    </div>
  );
}

function PostListingFormBase({ authUser, firebase, history }) {
  const [listingInfo, setListingInfo] = useState(LISTING_ATTRIBUTES);
  const [error, setError] = useState(null);

  const [selectedFile, setSelectedFile] = useState({ file: "", fileRef: "" });

  const {
    brand,
    model,
    length,
    condition,
    price,
    description,
    location,
  } = listingInfo;
  const isInvalid = Object.values({
    ...listingInfo,
    image: "string to pass validation",
  }).includes("");

  function onSubmit(e) {
    console.log(selectedFile);
    const postID = cuid();
    const location = `${postID}/${selectedFile.fileRef}`;

    const uploadTask = firebase.upload(selectedFile.file, location);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case firebase.taskState.PAUSED: // or 'paused'
        //     console.log("Upload is paused");
        //     break;
        //   case firebase.taskState.RUNNING: // or 'running'
        //     console.log("Upload is running");
        //     break;
        // }
      },
      function (err) {
        // Handle unsuccessful uploads
        console.error(err);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (imageURL) {
          console.log("File available at", imageURL);
          firebase
            .post(postID)
            .set({ ...listingInfo, image: imageURL, userID: authUser.uid })
            .then(function () {
              console.log("Document written with ID: ", postID);
              setListingInfo(LISTING_ATTRIBUTES);
              // Add an id reference to the new post to the user by updating the users post array
              firebase
                .user(authUser.uid)
                .update({
                  posts: firebase.app.firestore.FieldValue.arrayUnion(postID),
                })
                .then(function () {
                  console.log(
                    "User document succesfully updated with new post reference"
                  );
                  history.push(`${ROUTES.VIEW_LISTINGS}/${postID}`);
                });
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        });
      }
    );

    e.preventDefault();
  }

  function onChange(e) {
    const { name, value } = e.target;

    setListingInfo(info => ({
      ...info,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="brand"
        value={brand}
        onChange={onChange}
        type="text"
        placeholder="Brand"
      />
      <input
        name="model"
        value={model}
        onChange={onChange}
        type="text"
        placeholder="Model"
      />
      <input
        name="length"
        value={length}
        onChange={onChange}
        type="text"
        placeholder="Length"
      />
      <input
        name="condition"
        value={condition}
        onChange={onChange}
        type="text"
        placeholder="Condition"
      />
      <input
        name="price"
        value={price}
        onChange={onChange}
        type="text"
        placeholder="Price"
      />
      <input
        name="description"
        value={description}
        onChange={onChange}
        type="text"
        placeholder="Description"
      />
      <input
        name="location"
        value={location}
        onChange={onChange}
        type="text"
        placeholder="Location"
      />
      <FileUpload setSelectedFile={setSelectedFile} />
      <button disabled={isInvalid} type="submit">
        Post Listing
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const PostListingForm = compose(withRouter, withFirebase)(PostListingFormBase);

export default PostListing;
