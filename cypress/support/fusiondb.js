Cypress.fusionDB = {
  allow(allowedTags, callback) {
    if (allowedTags && allowedTags.length) {
      const tags = Cypress.env('TEST_TAGS').split(',');
      if (allowedTags.some(tag => tags.indexOf(tag) > -1)) {
        callback();
        return;
      }
    }
  },
  minApi(minVersion, callback, strict) {
    const tags = Cypress.env('TEST_TAGS').split(',');
    const versionTag = tags.find(tag => tag.substr(0, 3) === 'API');
    if (!versionTag && !strict) {
      callback();
    } else {
      const [minMajor, minMinor, minPatch] = minVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = versionTag.substr(3).split('.').map(val => Number.parseInt(val));
      if ((major > minMajor)
        || (major === minMajor && minor > minMinor)
        || (minor === minMinor && patch >= minPatch)) {
        callback();
      }
    }
  },
  maxApi(maxVersion, callback, strict) {
    const tags = Cypress.env('TEST_TAGS').split(',');
    const versionTag = tags.find(tag => tag.substr(0, 3) === 'API');
    if (!versionTag && !strict) {
      callback();
    } else {
      const [maxMajor, maxMinor, maxPatch] = maxVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = versionTag.substr(3).split('.').map(val => Number.parseInt(val));
      if ((major < maxMajor)
        || (major === maxMajor && minor < maxMinor)
        || (minor === maxMinor && patch < maxPatch)) {
        callback();
      }
    }
  },
  api(minVersion, maxVersion, callback, strict) {
    const tags = Cypress.env('TEST_TAGS').split(',');
    const versionTag = tags.find(tag => tag.substr(0, 3) === 'API');
    if (!versionTag && !strict) {
      callback();
    } else {
      const [minMajor, minMinor, minPatch] = minVersion.split('.').map(val => Number.parseInt(val));;
      const [maxMajor, maxMinor, maxPatch] = maxVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = versionTag.substr(3).split('.').map(val => Number.parseInt(val));
      if (((major < maxMajor)
        || (major === maxMajor && minor < maxMinor)
        || (minor === maxMinor && patch < maxPatch))
        && ((major > minMajor)
          || (major === minMajor && minor > minMinor)
          || (minor === minMinor && patch >= minPatch))) {
        callback();
      }
    }
  },
}
