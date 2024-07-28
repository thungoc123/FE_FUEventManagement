import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, [Your Website], and other sites we own and operate.</p>
        
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We only collect information about you if we have a reason to do so — for example, to provide our Services, to communicate with you, or to make our Services better.</p>
        
        <h3 className="text-xl font-medium mb-2">Information You Provide to Us</h3>
        <p className="mb-4">It’s probably no surprise that we collect information that you provide to us directly. Here are some examples:</p>
        <ul className="list-disc ml-5 mb-4">
          <li className="mb-2">Basic account information: We ask for basic information from you in order to set up your account.</li>
          <li className="mb-2">Public profile information: If you have an account with us, we collect the information that you provide for your public profile.</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-2">Information We Collect Automatically</h3>
        <p className="mb-4">We also collect some information automatically:</p>
        <ul className="list-disc ml-5 mb-4">
          <li className="mb-2">Log information: Like most online service providers, we collect information that web browsers, mobile devices, and servers typically make available.</li>
          <li className="mb-2">Usage information: We collect information about your usage of our Services.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
        <p className="mb-4">We use information about you as mentioned above and for the purposes listed below:</p>
        <ul className="list-disc ml-5 mb-4">
          <li className="mb-2">To provide our Services.</li>
          <li className="mb-2">To further develop and improve our Services.</li>
          <li className="mb-2">To monitor and analyze trends and better understand how users interact with our Services.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">3. Sharing Information</h2>
        <p className="mb-4">We do not sell our users' private personal information.</p>
        <ul className="list-disc ml-5 mb-4">
          <li className="mb-2">We share information about you in the limited circumstances spelled out below and with appropriate safeguards on your privacy.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
        <p className="mb-4">While no online service is 100% secure, we work very hard to protect information about you against unauthorized access, use, alteration, or destruction, and take reasonable measures to do so.</p>
        
        <h2 className="text-2xl font-semibold mb-4">5. Privacy Policy Changes</h2>
        <p className="mb-4">Although most changes are likely to be minor, we may change our Privacy Policy from time to time. We encourage visitors to frequently check this page for any changes to our Privacy Policy.</p>
        
        <p className="mb-4">If you have any questions about our Privacy Policy, please contact us.</p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
