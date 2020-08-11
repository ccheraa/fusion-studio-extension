/// <reference types="cypress" />

declare namespace Cypress {
  interface Cypress {
    fusionDB: {
      allow(allowedTags: string[], callback: () => any): void;
      minApi(minVersion: string, callback: () => any, strict?: boolean): void;
      maxApi(maxVersion: string, callback: () => any, strict?: boolean): void;
    }
  }
}