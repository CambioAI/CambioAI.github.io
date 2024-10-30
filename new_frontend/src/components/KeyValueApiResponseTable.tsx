import React from 'react';
import './KeyValueApiResponseTable.css';
const KeyValueApiResponseTable = ({ data }: any) => {
      const datatoShow  =  data.output_dict;
      console.log(datatoShow);

    if (!datatoShow || datatoShow.length === 0) return <p>No data available</p>;

    const firstEntry = datatoShow[0]; // Assuming you only need to show the first object from the array

    return (
        <div className="api-response-table-container">
            <table className="api-response-table">
                <tbody>
                    {Object.entries(firstEntry).map(([key, value]: any) => (
                        <tr key={key}>
                            <th>{key}</th>
                              <td>{value.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KeyValueApiResponseTable;
