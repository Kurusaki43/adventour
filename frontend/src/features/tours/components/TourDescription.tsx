type TourDescriptionProps = {
  description: string;
};
const TourDescription = ({ description }: TourDescriptionProps) => {
  return (
    <div className="space-y-2 rounded-2xl p-4 bg-card shadow-sm">
      <h3 className="font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
        Description
      </h3>
      <p className="font-light">{description}</p>
    </div>
  );
};

export default TourDescription;
