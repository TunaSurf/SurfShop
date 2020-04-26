import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // TODO: Link to individual listing page @ listings/{listingID}
import { compose } from "recompose";
import styled from "styled-components";

import { withFirebase } from "../Firebase";

function ViewListingsBase({ firebase }) {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.posts().onSnapshot(snapshot => {
      let listings = [];

      snapshot.forEach(doc => {
        listings.push({ ...doc.data(), uid: doc.id });
      });

      setListings(listings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <div>
      <h1>Listings</h1>
      {loading && <div>Loading ...</div>}
      <ListingsList listings={listings} />
    </div>
  );
}

function ListingsList({ listings }) {
  return (
    <StyledListing>
      <ul>
        {listings.map(listing => (
          <li key={listing.uid}>
            <span>{listing.brand}</span>
            <span>{listing.model}</span>
            <span>
              <strong>User:</strong> {listing.userID}
            </span>
          </li>
        ))}
      </ul>
    </StyledListing>
  );
}

const StyledListing = styled.div`
  li {
    padding: 5px;
    margin-bottom: 10px;
    background: #eee;
    border-radius: 3px;
  }

  span {
    display: block;
  }
`;

const ViewListings = compose(withFirebase)(ViewListingsBase);

export default ViewListings;
