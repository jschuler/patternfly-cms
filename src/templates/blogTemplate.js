import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // markdownRemark is the property that we find has all the details of the Markdown file
  // We can use that to construct a template for our blogpost view. Since it’s a React 
  // component, you could style it with any of the recommended styling systems in Gatsby
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

// The result of the query is injected by Gatsby into the Template component as data
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;