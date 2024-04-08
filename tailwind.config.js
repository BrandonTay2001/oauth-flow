/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.js"],
  theme: {
    extend: {},
  },
  plugins: [],
  resolve: {
  fallback: {
    "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
  }
}
}

