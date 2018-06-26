# leagueofcomicgeeks

[![Greenkeeper badge](https://badges.greenkeeper.io/alistairjcbrown/leagueofcomicgeeks.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/leagueofcomicgeeks.svg)](https://badge.fury.io/js/leagueofcomicgeeks)
[![Build Status](https://travis-ci.org/alistairjcbrown/leagueofcomicgeeks.svg?branch=master)](https://travis-ci.org/alistairjcbrown/leagueofcomicgeeks)
[![Dependencies Status](https://david-dm.org/alistairjcbrown/leagueofcomicgeeks/status.svg)](https://david-dm.org/alistairjcbrown/leagueofcomicgeeks)

Unofficial Node.js library for interacting with [League of Comic Geeks](https://leagueofcomicgeeks.com/). This provides an API for any system wishing to interact with an account on League of Comic Geeks and supports authentication and all lists. It has a comprehensive integration test setup to detect when the site makes breaking changes. Please create an issue or (better yet) a pull request if you see a problem or need additional features!

---

## Resources

1. Session - `lofcg.session`
1. New Comics - `lofcg.newComics`
1. Search Results - `lofcg.searchResults`
1. Collection - `lofcg.collection`
1. Read List - `lofcg.readList`
1. Wish List - `lofcg.wishList`
1. Pull List - `lofcg.pullList`

All methods on resources are asynchronous and follow the nodejs "error-first callback" pattern. For use with promises, consider using something like [Bluebird's promisification functions](http://bluebirdjs.com/docs/api/promisification.html).

There are examples on using the different resources in the `examples` directory.

### Session

Methods on the session object:
 - `.create` - Create a new session using the provided username and password. This sets up the session for all subsequent calls.
 - `.validate` - Validate that the active session is still valid.
 - `.destroy` - Destroy the current session both locally and on the site.
 - `.get` - Get the active session object.
 - `.set` - Set a previously retrieved session object.

Used to log in and out of the application. You can get the current session object for saving, as well as set the current session by setting a previously retrieved session object. The active session can then be validated to confirm it's working.

### Lists

Calls to get list data all follow a standard format:

```js
list.get(identifier, options, callback);
```

Where the `identifier` can be an issue id, series id, search term, pull list date, etc. depending on the list being accessed.

The `options` parameter is optional, but is used to specify the type returned (eg. "series" or "issue") and for any sorting or filtering.

Options support:
 - `type` - Defaults to issue (`lofcg.types.ISSUE`).
   - Use the `lofcg.types` helper for getting type values
     - `lofcg.types.ISSUE` - Single commic issues
     - `lofcg.types.SERIES` - Comic series
 - `publishers` - an array of publisher names to filter on. Defaults to no filtering.
 - `filter` - Defaults to empty array (`[]`), all data returned.
   - Use the `lofcg.filters` helper for getting filter values
     - `lofcg.filters.FIRST_ISSSUES` - Return only first issue comics. __Note:__ This filter only works on the New Comics and Search Results list
 - `sort` - Defaults to ascending (`lofcg.sort.ASCENDING`).
   - Use the `lofcg.sort` helper for getting sort values
     - `lofcg.sort.ASCENDING` - Ascending alphabetically
     - `lofcg.sort.DESCENDING` - Descending alphabetically
     - `lofcg.sort.MOST_PULLED` - Descending by how many members have this in their pull list
     - `lofcg.sort.PICK_OF_THE_WEEK` - Descending by pick of the week rating
     - `lofcg.sort.CONSENSUS_RATING` - Descending by community consensis rating
   - **Note:** Sorting is performed within the module on the response from the server (ie. not by the server itself) due to sorting bugs in the endpoints. However, the server may provide additional sorting options, depending on the list. Passing a value which is not one of the two supported will be delegated to the server. The server equivalents of the above are `alpha-asc`, `alpha-desc`, `pulls`, `potw` and `community`

```js
const lofcg = require('leagueofcomicgeeks');
const options = {
  type: lofcg.types.SERIES,
  publishers: ['Marvel Comics', 'DC Comics', 'Other'],
  sort: lofcg.sort.DESCENDING
}
lofcg.searchResults.get('detective', options, function (err, results) {
   // ...
});
```

The exception to this is the Pull List, which also requires a date:

```js
const lofcg = require('leagueofcomicgeeks');
const myUserId = 26853; // alistairjcbrown
lofcg.pullList.get(myUserId, '2017-03-29', function (err, pullList) {
  // ...
});
```

Again, additional examples can be found in the `examples` directory.

#### Read-only Lists

Methods on read-only lists:
 - `.get` - Get a list of comic issues or series for a user

New Comics and Search Results are read-only lists - you can only get data from them, you cannot update them.

#### User Lists

Methods on user lists:
 - `.get` - Get a list of comic issues or series for a user
 - `.add` - Add a comic issue or series to my list
 - `.remove` - Add a comic issue or series to my list

**Note:** `.add` and `.remove` require you to be authenticated. `.get` does not and can be called on any user.

---

## Who am I?

Just a comic fan and someone who wanted to build on top of the awesome system in place at League of Comic Geeks.

You can see my profile here: https://leagueofcomicgeeks.com/profile/alistairjcbrown
