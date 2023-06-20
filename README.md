# Is it OG?

A tiny layer of logic to put in front of a URL shortener which can display a custom OG image to user agents which unfurl URLs to display their Open Graph image and data.

Helpful for displaying custom branding in short links to third party resources.

Currently serving custom OG images to:

- Twitter
- LinkedIn
- Slack

Add support for more by adding an identifier from the user agent string of the desired channel to the array of [`unfurlers`](https://github.com/philhawksworth/custom-og/blob/0ac370044ddbbe96f4ae308e3cae96815134fe1d/netlify/edge-functions/is-it-og.ts#L27).

## Usage

1. Make your short link as usual via your configured url shortener (such as bit.ly)
1. (Ideally) give it a custom path rather than just adopting the random short code
1. Commit a png file to the `/dist/image/` directory in the repo with a file name which corresponds to the path in the URL shortener. Example: `https://ourog.netlify.app/esm` and `/dist/image/esm.png`
1. Any paths without a custom OG image will invisibly fall through to the original shortlink destination

## Assumptions

1. This repo is deployed as a site on Netlify
1. A suitable domain is configured to point at the site and is declared in the `rootDomaian` constant [in the edge function](https://github.com/philhawksworth/custom-og/blob/0ac370044ddbbe96f4ae308e3cae96815134fe1d/netlify/edge-functions/is-it-og.ts#L4)
1. A url shortener service is being used to create custom shortlists, and the domain for this shortener is declared in the `shortLinkDomain` constant [in the edge function](https://github.com/philhawksworth/custom-og/blob/0ac370044ddbbe96f4ae308e3cae96815134fe1d/netlify/edge-functions/is-it-og.ts#L5)
