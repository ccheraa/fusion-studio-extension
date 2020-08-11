Cypress.fusionDB = {
  apiVersion() {
    const tagsString = Cypress.env('TEST_TAGS')
    if (tagsString) {
      const tags = tagsString.split(',');
      const versionTag = tags.find(tag => tag.substr(0, 3) === 'API');
      return versionTag.substr(3);
    }
    return Cypress.env('API_MINIMUM_VERSION') || '0.2.0';
  },
  allow(allowedTags, callback) {
    if (allowedTags && allowedTags.length) {
      const tagsString = Cypress.env('TEST_TAGS')
      if (tagsString) {
        const tags = tagsString.split(',');
        const allowedTag = allowedTags.find(tag => tags.indexOf(tag));
        if (allowedTag) {
          callback(allowedTag);
          return;
        }
      }
    }
  },
  minApi(minVersion, callback, strict) {
    const version = this.apiVersion();
    if (!version && !strict) {
      callback(version);
    } else {
      const [minMajor, minMinor, minPatch] = minVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = version.split('.').map(val => Number.parseInt(val));
      if ((major > minMajor)
        || (major === minMajor && minor > minMinor)
        || (minor === minMinor && patch >= minPatch)) {
        callback(version);
      }
    }
  },
  maxApi(maxVersion, callback, strict) {
    const version = this.apiVersion();
    if (!version && !strict) {
      callback(version);
    } else {
      const [maxMajor, maxMinor, maxPatch] = maxVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = version.split('.').map(val => Number.parseInt(val));
      if ((major < maxMajor)
        || (major === maxMajor && minor < maxMinor)
        || (minor === maxMinor && patch < maxPatch)) {
        callback(version);
      }
    }
  },
  api(minVersion, maxVersion, callback, strict) {
    const version = this.apiVersion();
    if (!version && !strict) {
      callback(version);
    } else {
      const [minMajor, minMinor, minPatch] = minVersion.split('.').map(val => Number.parseInt(val));;
      const [maxMajor, maxMinor, maxPatch] = maxVersion.split('.').map(val => Number.parseInt(val));;
      const [major, minor, patch] = version.split('.').map(val => Number.parseInt(val));
      if (((major < maxMajor)
        || (major === maxMajor && minor < maxMinor)
        || (minor === maxMinor && patch < maxPatch))
        && ((major > minMajor)
          || (major === minMajor && minor > minMinor)
          || (minor === minMinor && patch >= minPatch))) {
        callback(version);
      }
    }
  },
}
