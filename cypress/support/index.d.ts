/// <reference types="cypress" />

declare namespace Cypress {
  interface Cypress {
    fusionDB: {
      allow(allowedTags: string[], callback: () => any): void;
    }
  }
}