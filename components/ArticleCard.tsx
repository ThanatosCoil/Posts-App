import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Article } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type ArticleTypeCard = Omit<Article, "author"> & { author?: Author };

const ArticleCard = ({ post }: { post: ArticleTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    description,
    image,
  } = post;

  return (
    <li className="article-card group">
      <div className="flex-between">
        <p className="article_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/article/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/article/${_id}`}>
        <p className="article-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="article-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <Button className="article-card_btn" asChild>
          <Link href={`/article/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const ArticleCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="article-card_skeleton" />
      </li>
    ))}
  </>
);

export default ArticleCard;
