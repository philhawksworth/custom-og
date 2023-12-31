export default (data) => {
 return `
 <!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Is it OG?</title>
   <link rel="icon" href="/image/icons/favicon.ico" sizes="any">
   <link rel="icon" href="/image/icons/icon.svg" type="image/svg+xml">
   <meta name="twitter:card" content="summary_large_image"/>
   <meta name="twitter:site" content="@netlify"/>
   <meta name="twitter:title" content="${data.title}"/>
   <meta name="twitter:description" content="${data.description}"/>
   <meta name="twitter:creator" content="@netlify"/>
   <meta name="twitter:image" content="${data.domain}/image${data.path}.png"/>
   <meta name="og:image" content="${data.domain}/image${data.path}.png"/>
   <meta name="og:image:secure_url" content="${data.domain}/image${data.path}.png"/>
   <meta name="image" property="og:image" content="${data.domain}/image${data.path}.png"/>
   <meta property="og:site_name" content="Netlify"/>
   <meta property="og:title" content="${data.title}"/>
   <meta property="og:description" content="${data.description}"/>
 </head>
 <body>
   <h1>OG image for this URL</h1>
   <img src="${data.domain}/image/${data.path}.png" />
 </body>
 </html>
 `;
}
