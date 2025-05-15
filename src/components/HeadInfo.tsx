const HeadInfoAccount = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 ">
      <div className="flex items-center justify-between gap-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-md">
        <div>
          <p className="text-md  leading-6 text-white">Hello,</p>
          <p className="text-lg font-semibold leading-5 text-white">Basrunki Siburian</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};
export default HeadInfoAccount;
