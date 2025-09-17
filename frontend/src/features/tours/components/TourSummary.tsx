type TourSummaryProps = {
  summary: string;
};
const TourSummary = ({ summary }: TourSummaryProps) => {
  return (
    <div className="space-y-2 rounded-2xl p-4 bg-card shadow-sm">
      <h3 className="font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
        Quick Summary
      </h3>
      <p className="font-light">{summary}</p>
    </div>
  );
};

export default TourSummary;
