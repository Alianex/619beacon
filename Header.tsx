import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-12 w-12 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                619 Beacon
              </h1>
              <p className="text-sm text-yellow-300 tracking-wide font-medium">Lighting the Way to Resources in San Diego</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;