import App from "../../../App";

const Account = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to Relume</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
      </header>

      {/* Form */}
      <form>
        <div className="space-y-6">
          {/* Company Name */}
          <div className="border-b pb-4">
            <label className="block text-gray-700 mb-1">What is your company name?</label>
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          {/* Organization */}
          <div className="border-b pb-4">
            <label className="block text-gray-700 mb-1">Enter your Organization</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="hello@relume.io" 
                className="w-full border border-gray-300 p-2 rounded pl-10" 
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M2.94 6.94a.75.75 0 011.06 0l5 5 5-5a.75.75 0 011.06 1.06l-5 5a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Company Name */}
          <div className="border-b pb-4">
            <label className="block text-gray-700 mb-1">What is your company name?</label>
            <input 
              type="text" 
              placeholder="e.g. Relume" 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          {/* Logo Link */}
          <div className="border-b pb-4">
            <label className="block text-gray-700 mb-1">Logo Link</label>
            <input 
              type="url" 
              placeholder="Link your logo" 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
