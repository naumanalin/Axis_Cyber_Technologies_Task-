import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold">Task by Axis Cyber Technologies</p>
        <p className="text-sm mt-2">
          Contact me:{" "}
          <a
            href="https://github.com/naumanalin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            My Portfolio
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
