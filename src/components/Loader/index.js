import "./loader.css";

 const Loader = () => {
  return (
    <div className="fixed inset-0 backdrop-filter backdrop-brightness-50 z-10 flex items-center justify-center">
      <div className="h-16 w-16 rounded-full border-spotify-white animate-spin loader"></div>
    </div>
  );
};

export default Loader;