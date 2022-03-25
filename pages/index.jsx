import Head from "next/head";
import styles from "@styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Markdown Blog</title>
        <meta
          name="description"
          content="Now in its Tenth Edition, Concepts of Programming Languages introduces students to the main constructs of contemporary programming languages and provides the tools needed to critically evaluate existing and future programming languages. Readers gain a solid foundation for understanding the fundamental concepts of programming languages through the author's presentation of design issues for various language constructs, the examination of the design choices for these constructs in some of the most common languages, and critical comparison of the design alternatives. In addition, Sebesta strives to prepare the reader for the study of compiler design by providing an in-depth discussion of programming language structures, presenting a formal method of describing syntax, and introducing approaches to lexical and syntactic analysis."
        />
        <meta property="og:title" content="Next.js" />
        <meta property="og:image" content="/images/meta-image.jpg" />
      </Head>

      <main>
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the post dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from post
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
