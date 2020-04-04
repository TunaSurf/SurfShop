import { Plugin } from "@uppy/core";

export default class MyPlugin extends Plugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    if (!opts.storageRef) {
      throw Error(
        "Please provide the root storageRef to be used as option `storageRef`. See https://firebase.google.com/docs/storage/web/upload-files"
      );
    }
    this.id = opts.id || "MyPlugin";
    this.type = "uploader";
  }
}
