import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating, Star } from "@smastrom/react-rating";

const itemStyles = {
  activeFillColor: "#2fa3f1",
  inactiveFillColor: "#ddd",
};

type Review = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
};

interface ReviewsProps {
  averageRating: number;
  reviews: Review[];
}

const GuideReviewsList = ({ averageRating, reviews }: ReviewsProps) => {
  return (
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <strong>{averageRating}</strong>
          <div className="flex items-center flex-row gap-2 text-primary">
            <Rating
              readOnly
              value={4}
              className="max-w-24"
              itemStyles={{ ...itemStyles, itemShapes: Star }}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-3 border-b pb-3 last:border-none"
          >
            <Avatar>
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.name}</span>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center text-yellow-500">
                <Rating
                  readOnly
                  value={4}
                  className="max-w-16"
                  itemStyles={{ ...itemStyles, itemShapes: Star }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GuideReviewsList;
