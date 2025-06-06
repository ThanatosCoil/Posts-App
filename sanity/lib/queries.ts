import { defineQuery } from "next-sanity";

export const ARTICLES_QUERY =
  defineQuery(`*[_type == "article" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  author->,
  views,
  description,
  category,
  image,
  pitch,
  _createdAt,
}`);

export const ARTICLE_BY_ID = defineQuery(`*[_type=="article" && _id == $id][0]{
  _id,
  title,
  slug,
  author->,
  views,
  description,
  category,
  image,
  pitch,
  _createdAt,
}`);

export const ARTICLE_VIEWS_QUERY =
  defineQuery(`*[_type == "article" && _id == $id][0]{
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id==$id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
    }
    `);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id==$id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
    }
    `);

export const ARTICLES_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "article" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  author->,
  views,
  description,
  category,
  image,
  pitch,
  _createdAt,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
