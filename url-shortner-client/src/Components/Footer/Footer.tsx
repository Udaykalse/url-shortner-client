import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <div className="bg-slate-900 text-white text-base text-center py-5 ">
        copyright &#169; URLShorter | Uday Kalse
    </div>
  ) ;
};

export default Footer;
