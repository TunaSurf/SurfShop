import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { LISTING_ATTRIBUTES } from "../../constants/listing";

function ListingBase({ firebase, match }) {
  const { listingID } = match.params;

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(LISTING_ATTRIBUTES);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.post(listingID).onSnapshot(snapshot => {
      let listing = { ...snapshot.data() };
      console.log("Listing:", listing);

      setListing(listing);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebase, listingID]);

  return (
    <div>
      {loading && <div>Loading ...</div>}
      <ListingDetails listing={listing} />
    </div>
  );
}

function ListingDetails({ listing }) {
  return (
    <div>
      <ul>
        <li>{listing.brand}</li>
        <li>{listing.model}</li>
        <li>{listing.length}</li>
        <li>{listing.condition}</li>
        <li>{listing.price}</li>
        <li>{listing.description}</li>
      </ul>
      <img src={listing.image} alt="" style={{ width: "200px" }}></img>
    </div>
  );
}

const Listing = compose(withRouter, withFirebase)(ListingBase);

export default Listing;
