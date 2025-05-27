"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const ArticleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title,
        description,
        category,
        link,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your article pitch has been created successfully",
        });
        router.push(`/article/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="article-form">
      <div>
        <label htmlFor="title" className="article-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="article-form_input"
          required
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {errors.title && <p className="article-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="article-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="article-form_textarea"
          required
          placeholder="Article Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {errors.description && (
          <p className="article-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="article-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="article-form_input"
          required
          placeholder="Article Category (Tech, Health, Education...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {errors.category && (
          <p className="article-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="article-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="article-form_input"
          required
          placeholder="Article Image URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {errors.link && <p className="article-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="article-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="article-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="article-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};
export default ArticleForm;
