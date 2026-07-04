/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://nagammasafetynets.com",
  generateRobotsTxt: true, // auto create robots.txt

  sitemapSize: 7000,

  changefreq: "daily",
  priority: 0.9,
  exclude: ['/admin/*', '/private/*', '/404',
    '/500',], 


  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  trailingSlash: true,
  outDir: './out', 
};

module.exports = config;
