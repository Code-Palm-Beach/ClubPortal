/**
 * This is a file of data and helper functions that we can expose and use in our templated function
 */

// FS is a built in module to node that lets us read files from the system we are running on
const fs = require("fs");

// moment.js is a handly library for display dates.
exports.moment = require("moment");

// Dump is a handly debugging function we can use to sort of "console.log()" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// inserting an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.sgv`);

// Some details about the site
exports.siteName = `Code Palm Beach`;

exports.menu = [
  { slug: "/about", title: "About" },
  { slug: "/events", title: "Events" },
  { slug: "/volunteer", title: "Volunteer" },
  { slug: "/resorces", title: "Resources" },
  { slug: "/support", title: "Support" }
];
