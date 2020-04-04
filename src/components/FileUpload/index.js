import React, { useEffect, useRef, useState } from "react";
import cuid from "cuid";
import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

// export default function FileUpload() {
//   const uppyRef = useRef(null);

//   useEffect(() => {
//     uppyRef.current = Uppy();

//     return () => {
//       uppyRef.current.close();
//     };
//   }, []);

//   return uppyRef.current && <Dashboard uppy={uppyRef.current} />;
// }

export default function FileUpload({ setSelectedFile }) {
  // Input type=file is an uncontrolled component, therefore the data
  // is handled by the DOM and not React, so we must use a ref to
  // store the instead of state.
  const fileInputs = useRef(null);

  function handleChange(e) {
    const id = cuid();
    const fileExtension = fileInputs.current.files[0].name.split(".").pop();
    const fileRef = `${id}.${fileExtension}`;
    // console.log(newFileName);
    setSelectedFile({ file: fileInputs.current.files[0], fileRef });
  }

  return (
    <label>
      Upload file:
      <input type="file" ref={fileInputs} onChange={handleChange} />
    </label>
  );
}
