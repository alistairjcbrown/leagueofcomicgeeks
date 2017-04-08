# leagueofcomicgeeks
Unofficial node.js library for interacting with League of Comic Geeks

## To do

 - Need ability to check session and log out
   - [X] Validate session by pulling a protected page
   - [X] Use `/logout` to destroy the session, also destroying locally

 - Tests
   - [ ] Integration tests
   - [ ] Update read-only integration tests to use a specificly set up test account, and confirm response content
   - [ ] Unit tests

 - Tooling
   - [ ] Linting
   - [ ] Documentation
   - [ ] Publish module

 - Can we dynamically load the publishers list in / update it periodically?
   - [ ] Perhaps a publisher module which can be called to get latest, which by default falls back to JSON file
   - [ ] Without coupling the code, can we use the session check to get the updated list of providers?

 - Additional filters
   - [ ] New comics; only #1s, sorting, etc.
