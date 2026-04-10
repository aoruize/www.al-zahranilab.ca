module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("social-preview.png");
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addCollection("publications", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/publications/*.md")
      .sort((a, b) => {
        const yearDiff = (b.data.year || 0) - (a.data.year || 0);
        if (yearDiff !== 0) return yearDiff;
        return (a.data.order || 999) - (b.data.order || 999);
      });
  });

  eleventyConfig.addCollection("team", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/team/*.md")
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addCollection("pets", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/pets/*.md")
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/news/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("research", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/research/*.md")
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addFilter("limit", function (arr, count) {
    return (arr || []).slice(0, count);
  });

  eleventyConfig.addFilter("where", function (arr, key, value) {
    return (arr || []).filter((item) => item.data[key] === value);
  });

  eleventyConfig.addFilter("whereNot", function (arr, key, value) {
    return (arr || []).filter((item) => item.data[key] !== value);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
