import * as React from "react";
import { UelData } from "../../interface/UrlData";
import { serverUrl } from "../../helpers/Constants";
import { Link } from "react-router-dom";
import axios from "axios";

interface IDataTableProps {
  data: UelData[];
  onDelete: (id: string) => void; 
  updateReloadState: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const { data, updateReloadState } = props;
  console.log("Data In DataTable is ", data);

  const renderTableData = () => {
    return data.map((item) => (
      <tr key={item._id} className="bg-white border-b hover:bg-gray-100">
        <td className="px-6 py-4 text-sm text-gray-900 break-all">
          <Link
            to={item.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {item.fullUrl}
          </Link>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 break-all">
          <Link
            to={`${serverUrl}/shortUrl/${item.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            {item.shortUrl}
          </Link>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{item.clicks}</td>
        <td className="px-6 py-4 text-sm text-right">
          <button 
            onClick={() => copyToClipboard(item.shortUrl)} 
            className="text-blue-500 hover:text-blue-700 mr-2"
            title="Copy URL"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
          </button>
          <button 
            className="text-red-500 hover:text-red-700"
            title="Delete URL"
            onClick={() => deleteUrl(item._id)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </td>
      </tr>
    ));
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      alert(`Url is copied: ${serverUrl}/shortUrl/${url}`);
    } catch (error) {
      console.error("Failed to copy URL: ", error);
    }
  };
  
  const deleteUrl = async (id: string) => {
    try {
      const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
      console.log(response);
      if (response.status === 200) {
        updateReloadState();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
        console.error('Error response:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  return (
    <div className="container mx-auto pt-4 pb-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-500 text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3 w-6/12">
                Full URL
              </th>
              <th scope="col" className="px-6 py-3 w-3/12">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
