import * as React from 'react';
import { UelData } from '../../interface/UrlData';
import FormContainer from './../FormContainer/FormContainer';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import DataTable from '../Data/DataTable';

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UelData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const updateReloadState = (): void => {
    setReload((prev) => !prev); 
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      console.log("The Response From server Is:", response);
      setData(response.data);
      console.log("Data", response.data); 
      setReload(false);
    } catch (error) {
      console.error("Error fetching data:", error); 
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <>
      <FormContainer  updateReloadState={updateReloadState}/> 
      <DataTable updateReloadState={updateReloadState} data={data} onDelete={function (id: string): void {
              throw new Error('Function not implemented.');
          } } />
    </>
  );
};

export default Container;
