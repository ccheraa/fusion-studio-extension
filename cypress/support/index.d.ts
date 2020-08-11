/// <reference types="cypress" />

declare namespace Cypress {
  interface Cypress {
    fusionDB: {
      apiVersion(): string;
      allow(allowedTags: string[], callback: (tag?: string) => any): void;
      minApi(minVersion: string, callback: (version?: string) => any, strict?: boolean): void;
      maxApi(maxVersion: string, callback: (version?: string) => any, strict?: boolean): void;
    }
  }
}