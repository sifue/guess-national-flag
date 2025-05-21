import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto py-4 text-center text-sm text-gray-600 border-t">
      <div className="container mx-auto px-4">
        <p>
          © {new Date().getFullYear()} Created by{' '}
          <span className="font-medium">sifue (Soichiro Yoshimura)</span>
        </p>
        <p className="mt-1">
          Open source on{' '}
          <a 
            href="https://github.com/sifue/guess-national-flag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 