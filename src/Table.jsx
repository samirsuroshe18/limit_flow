import React, { useState } from "react";
import axios from "axios";
import useMeterListData from "./hooks/useMeterListData";

const TableRow = ({ rowData, setRefresh }) => {
  const [limit, setLimit] = useState("");

  const handleSubmit = async () => {
    if (limit.length <= 0) {
      alert("please enter valid input");
      return;
    }

    const id = rowData.alert_id;
    const meter_id = rowData.meter_id;
    const maximum_threshold = limit;

    try {
      const formData = new FormData();

      formData.append("id", id);
      formData.append("meter_id", meter_id);
      formData.append("maximum_threshold", maximum_threshold);

      const res = await axios.post(
        "https://api.nbsense.in/water_ms/update_alert",
        formData,
        {
          headers: {
            Authorization: `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
          },
        }
      );

      setLimit("");
      setRefresh((prev) => prev + 1);
      alert("Successful!");
    } catch (error) {
      if (error.response) {
        console.error("Response error:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request error:", error.message);
      }
      alert("Failed");
    }
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-100">
        <td className="p-2 text-center min-w-[80px]">{rowData.meter_id}</td>
        <td className="p-2 min-w-[120px]">{rowData.meter_name}</td>
        <td className="p-2 text-center min-w-[100px]">
          {rowData.instant_flow}
        </td>
        <td className="p-2 text-center min-w-[100px]">{rowData.today_flow}</td>
        <td className="p-2 text-center min-w-[140px]">{rowData.dtime}</td>
        <td className="p-2 text-center min-w-[120px]">
          {rowData.maximum_threshold}
        </td>
        <td className="p-2 text-center min-w-[120px]">
          <input
            type="text"
            className="border p-1 rounded w-full"
            placeholder="Enter Limit"
            value={limit}
            onChange={handleLimitChange}
          />
        </td>
        <td className="p-2 text-center min-w-[100px]">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

const Table = () => {
  const [refresh, setRefresh] = useState(0);
  const data = useMeterListData(refresh);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="p-2 text-center">Bldg ID</th>
              <th className="p-2">Bldg Name</th>
              <th className="p-2 text-center">Instant Flow</th>
              <th className="p-2 text-center">Today's Flow</th>
              <th className="p-2 text-center">Last Seen</th>
              <th className="p-2 text-center">Max Threshold</th>
              <th className="p-2 text-center">Limit</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <TableRow
                key={row.meter_id}
                rowData={row}
                setRefresh={setRefresh}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
