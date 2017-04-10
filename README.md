# leagueofcomicgeeks

Unofficial Node.js library for interacting with [League of Comic Geeks](http://leagueofcomicgeeks.com/). This provides an API for any system wishing to interact with an account on League of Comic Geeks and supports authentication and all lists. It has has a comprehensive integration test setup to detect when the site has made breaking changes. Please create an issue or (better yet) a pull request if you see a problem or need additional features!

## Resources

1. Session
1. New Comics
1. Search Results
1. Collection
1. Read List
1. Wish List
1. Pull List

### Session

Methods on the session object:
 - `.create`
 - `.validate`
 - `.destroy`
 - `.get`
 - `.set`

Used to log in and out of the application. The current user session can be retrieved and loaded for serialisation.

### Lists

Calls to get list data all follow a standard format:

```
list.get(identifier, options, callback);
```

Where identifiers can be an issue id, series id, search term, pull list date, etc. depending on the list being accessed (see below for examples)

#### Read-only Lists

Methods on read-only lists:
 - `.get`

New Comics and Search Results are read-only lists, meaning you can only get data from them, you cannot update them.

#### User Lists

Methods on user lists:
 - `.get`
 - `.add`
 - `.remove`

**Note:** `.add` and `.remove` require you to be authenticated. `.get` does not and can be called on any user.


## To do

 - Need ability to check session and log out
   - [X] Validate session by pulling a protected page
   - [X] Use `/logout` to destroy the session, also destroying locally

 - Tests
   - [X] Integration tests
   - [X] Update read-only integration tests to use a specificly set up test account, and confirm response content
   - [ ] Provide sorting to prevent test data changing
   - [ ] Unit tests

 - API
   - [X] Does search and new comics need a user Id to be passed?

 - Tooling
   - [X] Linting
   - [ ] Documentation
   - [ ] Additional examples
   - [ ] Publish module

 - Can we dynamically load the publishers list in / update it periodically?
   - [ ] Perhaps a publisher module which can be called to get latest, which by default falls back to JSON file
   - [ ] Without coupling the code, can we use the session check to get the updated list of providers?

 - Additional filters
   - [ ] New comics; only #1s, sorting, etc.

## Who am I?

Just a comic fan and someone who wanted to build on top of the awesome system in place at League of Comic Geeks.

You can see my profile here: http://leagueofcomicgeeks.com/profile/alistairjcbrown
