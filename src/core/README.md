# BinderFlow Core

This folder contains platform-independent BinderFlow business types and helpers.

The goal is to keep TCG inventory logic separate from Wix UI and API code so that the same rules can be reused by:

- Wix Dashboard pages
- backend endpoints
- POS flows
- sync jobs
- future mobile/scanner clients

The Wix-specific integration layer should import from this folder, not duplicate the domain model.
