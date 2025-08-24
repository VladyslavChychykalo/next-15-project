import ROUTES from "@/constants/routes";
// import { getHotQuestions } from "@/lib/actions/question.action";
// import { getTopTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "How to use Next.js with TypeScript?" },
  { _id: "2", title: "What is the difference between React and Vue?" },
  { _id: "3", title: "How to optimize performance in a React application?" },
  { _id: "4", title: "What are the best practices for RESTful API design?" },
  { _id: "5", title: "How to manage state in a large React application?" },
];

const tags = [
  { _id: "1", name: "javascript", questions: 1200 },
  { _id: "2", name: "react", questions: 950 },
  { _id: "3", name: "nextjs", questions: 800 },
  { _id: "4", name: "nodejs", questions: 600 },
  { _id: "5", name: "typescript", questions: 500 },
];

const RightSidebar = async () => {
  //   const [
  //     { success, data: hotQuestions, error },
  //     { success: tagSuccess, data: tags, error: tagError },
  //   ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.QUESTION(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700 line-clamp-2">
                {title}
              </p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>

        {/* <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(hotQuestions: Array<{ _id: string; title: string }>) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {title}
                  </p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        /> */}
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {tags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>

        {/* <DataRenderer
          data={tags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          success={tagSuccess}
          error={tagError}
          render={(
            tags: Array<{ _id: string; name: string; questions: number }>
          ) => (
            <div className="mt-7 flex flex-col gap-4">
              {tags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        /> */}
      </div>
    </section>
  );
};

export default RightSidebar;
