import Spinner from "./Spinner";

function LoadingOnRefresh({ message = "Loading..." }) {
  return (
    <div className="w-full h-screen fixed inset-0 flex flex-col items-center justify-center bg-black/10 gap-4 backdrop-blur-lg">
      <Spinner />
      <span className="text-sm tracking-wider font-light text-muted-foreground">
        {message}
      </span>
    </div>
  );
}

export default LoadingOnRefresh;
