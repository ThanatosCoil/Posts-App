import ArticleCard, { ArticleTypeCard } from "@/components/ArticleCard";
import SearchForm from "../../components/SearchForm";
/* import { client } from "@/sanity/lib/client"; */
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query ? `*${query}*` : null };

  const session = await auth();

  /*   const posts = await client.fetch(ARTICLES_QUERY); */
  const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY, params });

  /*   const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Taro" },
      _id: 1,
      description: "Description",
      image:
        "https://i.ytimg.com/vi/94slre0DnB8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDlgWue0trEJ3PNELJq2ksQQWW5fg",
      category: "Robots",
      title: "2B",
    },
  ]; */

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Make Your Article, <br /> Express Your Ideas
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Articles, and Get Noticed in Virtual
          competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Articles"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ArticleTypeCard) => (
              <ArticleCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No articles found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
