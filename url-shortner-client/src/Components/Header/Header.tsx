import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
   <div className="bg-slate-800"> 
   <div className="container p-2 mx-auto">
<nav className="py-5">
    <div className="text-base text-white">
        URL-Shortner
    </div>
</nav>
   </div>
   </div>
  );
};

export default Header;
