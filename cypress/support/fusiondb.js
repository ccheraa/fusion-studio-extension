Cypress.fusionDB = {
  allow(allowedTags, callback) {
    if (allowedTags && allowedTags.length) {
      const tags = Cypress.env('TEST_TAGS').split(',');
      if (allowedTags.some(tag => tags.indexOf(tag) > -1)) {
        callback();
        return;
      }
    }
  }
}
