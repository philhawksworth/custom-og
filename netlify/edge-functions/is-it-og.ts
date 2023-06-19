
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import type { Config, Context } from "https://edge.netlify.com";
import page from "../og-page.js";

const shortLinkDomain = "https://ntl.fyi";
const rootDomain = "https://test--is-it-og.netlify.live";

// examples shortener paths:
  // custom image /43y6uut
  // no custom image: /3Jf2bMF


export default async (request: Request, context: Context) => {

  // What is being requested
  const url = new URL(request.url);

  // if the request is for an image
  // just let Netlify handle it as usual. We're done here.
  if(url.pathname.startsWith("/image/")) {
    return;
  }
  
  // User agents of referrers that we server an OG image to 
  // include these strings
  const unfurlers = [
    "slack",
    "Twitterbot",
    "LinkedInBot",
    // "Mozilla" // for testing
  ];

  // the requesting user agent
  const agent = request.headers.get("user-agent");
    
  // if this is unfurling an OG
  // return a page with the correct OG data and image link
  if (unfurlers.some(v => agent?.includes(v))) {
    
    // do we have a custom image?
    // no image? Pass the request on to its shortlink handler 
    const image = await fetch(`${rootDomain}/image${url.pathname}.png`);
    if(image.status == 404) {
      return Response.redirect(`${shortLinkDomain}/${url.pathname}`, 302);
    }
    
    
    // get the title and description from the final destination page
    const destination = await fetch(`${shortLinkDomain}/${url.pathname}`);
    const html = await destination.text();
    const $ = cheerio.load(html);
    const title =  $('meta[property="og:title"]').attr('content') || "Some title";
    const description =  $('meta[property="og:description"]').attr('content') || "Some description";
    
    // Populate our OG page template
    // and return it as HTML
    const ogPage = page({
      title: title,
      description: description,
      path: url.pathname
    })
    return new Response(ogPage, {
      headers: { "content-type": "text/html" },
    });

    
  } else {
    // if this is a visitor, just redirect to the destination 
    // via he usual shortlink provider
    return Response.redirect(`${shortLinkDomain}/${url.pathname}`, 302);
  }

};

// All requests to this domain come through here
export const config: Config = {
  path: "/*",
};
