import React from "react";
import Layout from "../component/layout/Layout";
import headerimg from "../assets/head.jpg";
function HomePage() {
  return (
    <Layout>
      <div className=" bg-backimg h-60">
        <div className=" flex">
          <div className="flex w-1/2 mt-28 ml-[23%] ">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <button
                className="w-20 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                Search by
              </button>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none  bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What are you shopping for?"
            />
            <span className="inline-flex items-center mr-2 px-3 text-sm text-white bg-yellow-600  border-none rounded-e-0 rounded-r-md dark:bg-white dark:text-gray-100 dark:border-gray-600">
              <button
                className="w-20 h-4 text-white dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="20 20 0 0"
              >
                Search
              </button>
            </span>
          </div>
        </div>
      </div>
      <div>
      प्रिय लिखकर मैं नीचे लिख दूँ नाम तुम्हारा कुछ जगह बीच में छोड़ दूँ
          नीचे लिख दूँ ‘सदा तुम्हारा’ लिखा बीच में क्या यह तुमको पढ़ना है कागज़
          पर मन की परिभाषा का अर्थ समझना है जो भी अर्थ निकलोगी तुम वह मुझको
          स्वीकार है झुके नयन, मौन अधर या कोरा कागज़ अर्थ सभी का प्यार है
      </div>
    </Layout>
  );
}

export default HomePage;
