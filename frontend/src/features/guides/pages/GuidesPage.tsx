import { Pagination } from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import GuidePublicCard from "@/features/guides/components/GuidePublicCard";
import { useGuides } from "@/features/guides/guidesQueries";
import { useFilter } from "@/hooks/useFilter";

const GuidesPage = () => {
  const limit = 6;
  const { filter } = useFilter();
  const { data, isPending } = useGuides({ ...filter, limit });
  const guides = data?.data.users;
  return (
    <div>
      <section className="-mt-[149px] bg-[url(/images/hero-1-bg.jpg)] bg-cover bg-bottom relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Our Team
            </h1>
          </div>
        </div>
      </section>
      <div className="main-container py-14">
        <h2 className="section-title self-start"> Meet our expert guides</h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 place-self-center sm:place-self-auto">
          {isPending &&
            Array.from({ length: limit }).map((_, i) => (
              <Skeleton key={i} className="h-78 w-full" />
            ))}
          {!isPending && guides?.length === 0 && (
            <p>No guides are added yet.</p>
          )}
          {!isPending && guides && (
            <>
              {guides.map((guide) => (
                <GuidePublicCard guide={guide} key={guide.id} />
              ))}
              <Pagination
                totalDocuments={data?.totalUsers || 0}
                className="mt-10 sm:col-span-2 md:col-span-3"
                documentsPerPage={limit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
