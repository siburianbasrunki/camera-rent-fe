const HeroSection = () => {
  return (
    <section className="relative overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse items-center">
          <div className="mt-1 relative w-full">
            <div className="relative rounded-b-md overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="camera rent"
                className="object-cover w-full h-[200px] rounded-b-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center px-4 flex-col bg-gradient-to-t from-black/40 to-transparent">
                <h1 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                  Capture Every Moment
                </h1>
                <h1 className="text-white text-md text-center drop-shadow-lg italic">
                  ~ Rent Your Dream Camera Today ~
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
