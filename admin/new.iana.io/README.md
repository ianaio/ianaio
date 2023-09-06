# new.iana.io + ianaio.new

This is a Netlify deployment to handle the Ianaio playgrounds shortcuts:

- [ianaio.new](https://ianaio.new) (main one, as of today domain is owned by StackBlitz but may be transferred to FB)
- [new.iana.io](https://new.iana.io) (legacy one)

See also the [Playground doc page](https://iana.io/docs/playground)

We use serverless functions because we want to persist the latest choice of the user in a cookie, so that it redirects directly to the preferred playground next time user visits this link. This is better to do it server-side with cookies and 302 redirects than with client redirects and localStorage.

Netlify deployment (Joel can give access): https://app.netlify.com/sites/ianaio-new/overview

Builds are stopped because we shouldn't need to redeploy very often. You can just trigger a manual build if needed.
