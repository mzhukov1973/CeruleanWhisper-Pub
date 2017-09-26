<!--
   Copyright 2017 Maxim Zhukov

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
# CeruleanWhisper
###### CeruleanWhisper - a protected comms Android app.
###### Version 0.0.1
### CeruleanWhisper *Pub* part of the app.
Live version of the React part of the app can be found [here](https://mzhukov1973.gitgub.io/CeruleanWhisper-Pub).

## ToDo:
- [x] ~~Refactor names etc to make it clear that this is the Pub part of the app and make placeholder for the Priv part.~~
- [x] ~~Add licensing information.~~
- [ ] Iron out non-standard quirks from React app:
  - [ ] Clean up /public directory, move all importable assets from /public/index.html to import {...} statements inside modules.
  - [ ] Properly fill manifest.json for Pub part of the App (and this IS Pub).
  - [ ] Create app icons, splash screens and favicons so that Cordova part of the app would bw able to properly use them (including 9-patch splash screen).
  - [ ] Check proper camelCase and other naming conventions are being kept to.
- [ ] Add first plugins to be used to Cordova part of the app, configure and test them:
  - [ ] Splashcreen (9-patch one).
  - [ ] SMS (the one where intercept is possible).
- [ ] Clean out the code for React: 
  - [ ] Make use of updated CSSBundler.
  - [ ] Encapsulate everything more - remove the "code leaks" when components improperly share functionality (as per architecture docs).
  - [ ] Make use of the flipper component as if it is a foreign one - thus giving it more testing in the install/config situation.
  - [ ] Consider using HOC to use flipper properly together with CSSBundler, possibly decouple them for good (and then use CSSBundler everywhere else in self-contained components just to see how it is holding up in the field).
- [ ] Implement classes for main objects, described in architecture docs:
  - [ ] Implement every class, descibed in architecture docs.
  - [ ] Test those that are applicable to Pub part.
  - [x] ~~Move those, that are Priv-only to a stub Priv repository folder.~~
- [x] ~~Add React apps' builds to local gh-pages as a live apps' GUI version (minus cordova base).~~
