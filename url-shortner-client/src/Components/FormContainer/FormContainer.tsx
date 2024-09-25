import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';

interface IFormContainerProps {
  updateReloadState: () => void;
}

interface IFormInput {
  fullUrl: string;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = ({ updateReloadState }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: IFormInput) => {
    try {
      await axios.post(`${serverUrl}/shorturl`, { fullUrl: data.fullUrl });
      updateReloadState();
      setIsSubmitted(true);
      reset();

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert("This URL has already been shortened. Please try another URL.");
      } else {
        console.error("Error submitting the URL:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full rounded-xl backdrop-brightness-50 p-6">
          <h2 className="text-white text-4xl text-center py-4">URL Shortener</h2>
          <p className="text-white text-center pb-2 text-xl font-extralight">Paste Your Link</p>
          <p className="text-white text-center pb-4 text-xs font-thin">
            Enter a long URL in the field, and we'll generate a short, easy-to-share link for you. 
            You can use the short link to quickly share the original URL with others, and it will redirect them to the full page!
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none text-slate-800">
                  urlshortner.link/
                </div>
                <input
                  type="text"
                  placeholder="Add your link"
                  {...register('fullUrl', {
                    required: 'URL is required', 
                    pattern: { 
                      value: /^(ftp|http|https):\/\/[^ "]+$/, 
                      message: 'Please enter a valid URL' 
                    } 
                  })}
                  className={`block w-full pl-36 p-4 text-sm text-gray-900 border ${errors.fullUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-600 focus:border-blue-500`}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 h-full px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Short URL
                </button>
              </div>
            </div>
            {errors.fullUrl && (
              <p className="text-red-500 text-center text-sm pt-2">{errors.fullUrl.message}</p>
            )}
          </form>
          
          {isSubmitted && (
            <div className="mt-4 text-green-500 text-center text-sm">
              URL shortened successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
