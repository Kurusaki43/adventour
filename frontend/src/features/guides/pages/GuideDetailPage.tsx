import { Rating, Star } from "@smastrom/react-rating";
import { MapPinCheckInside, Verified } from "lucide-react";
import "@smastrom/react-rating/style.css";
import { Badge } from "@/components/ui/badge";
import { languages } from "@/constants/languages";
import GuideAssignedToursList from "../components/GuideAssignedToursList";
import GuideReviewsList from "../components/GuideReviewsList";
import { useGuide } from "../guidesQueries";
import { useParams } from "react-router-dom";

const itemStyles = {
  activeFillColor: "#2fa3f1",
  inactiveFillColor: "#ddd",
};

const GuideDetailPage = () => {
  const { id } = useParams();
  const { data } = useGuide(id!);
  const profile = data?.guide.guideProfile;
  const guideLanguages = languages.filter((lang) =>
    profile?.languagesSpoken.map((l) => l.toLowerCase()).includes(lang.code)
  );
  return (
    <div>
      <section className="-mt-[149px] bg-[url(/images/hero-1-bg.jpg)] bg-cover bg-bottom relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Guide Detail
            </h1>
          </div>
        </div>
      </section>
      <div className="main-container py-14">
        <div className="relative">
          <div className="w-full h-74 bg-blue-100 rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`/uploads/guides/${profile?.imageCover}`}
              alt="guide cover"
            />
          </div>

          <div className="bg-blue-200 size-42 absolute -bottom-20 rounded-full left-1/2 -translate-x-1/2 sm:left-15 sm:-translate-x-0 border-white border-4 overflow-hidden">
            <img
              className="w-full h-full object-cover "
              src={`/uploads/users/${data?.guide.avatar}`}
            />
          </div>

          <div className="space-y-2 absolute left-1/2 -translate-x-1/2 mt-24 sm:mt-8 capitalize text-center w-full">
            <h2 className="text-4xl font-semibold">{data?.guide.name}</h2>
            <span className="font-light text-muted-foreground tracking-wider">
              Professional
              {data?.guide.role === "guide" ? " Guide" : " Lead Guide"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-between sm:flex-row translate-y-48 sm:translate-y-32 max-w-2xl mx-auto">
          <div className="flex items-center flex-row gap-2 text-primary">
            <Rating
              readOnly
              value={4}
              className="max-w-24"
              itemStyles={{ ...itemStyles, itemShapes: Star }}
            />
            <strong>(4.0)</strong>
          </div>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Badge className="text-xs tracking-widest">
              {profile?.yearsOfExperience} Years Experience
            </Badge>
            <Badge className="text-xs tracking-widest">
              <Verified />
              Certified Gudie
            </Badge>
          </div>

          <div className="flex items-center flex-row gap-2 text-muted-foreground">
            <MapPinCheckInside className="size-5" />
            <span className="capitalize text-sm font-light">
              {profile?.address}
            </span>
          </div>
        </div>
        <hr className="opacity-60 translate-y-46 sm:translate-y-32 my-10" />
        {/*About Section */}
        <section className="flex flex-col md:flex-row gap-10 mt-42 sm:mt-28 lg:mt-16">
          <div className="space-y-2 basis-1/2">
            <h3 className="font-semibold text-xl mb-4">About</h3>
            {profile?.bio?.split("\n").map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}

            <div className="text-muted-foreground text-md max-w-xl flex flex-wrap gap-2 mt-4">
              Languages:{" "}
              {guideLanguages.map((l) => (
                <div className="flex items-center gap-2 text-sm">
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 basis-1/2">
            <h3 className="font-semibold text-xl mb-4">Gallery</h3>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
              {profile?.images.map((img) => (
                <img
                  key={img}
                  className="h-30 w-full object-cover object-center rounded-xl"
                  src={`/uploads/guides/${img}`}
                />
              ))}
            </div>
          </div>
        </section>
        <hr className="opacity-60  my-2 lg:-mt-10" />
        <section className="flex flex-col lg:flex-row gap-5 -mt-6 lg:-mt-20">
          <div className="basis-[60%]">
            <h3 className="font-semibold text-xl mb-8">Tours Offered</h3>
            <GuideAssignedToursList />
          </div>
          <div className="basis-[40%]">
            <h3 className="font-semibold text-xl mb-8">Reviews</h3>
            <GuideReviewsList
              averageRating={4.8}
              reviews={[
                {
                  id: "1",
                  name: "Louisa Miller",
                  avatar: "/avatars/louisa.jpg",
                  rating: 5,
                  comment:
                    "John was an excellent guide! He made our trek unforgettable.",
                  date: "Sep 12, 2025",
                },
                {
                  id: "2",
                  name: "Mark Johnson",
                  avatar: "/avatars/mark.jpg",
                  rating: 4,
                  comment:
                    "Very knowledgeable and friendly, highly recommended!",
                  date: "Sep 10, 2025",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuideDetailPage;
