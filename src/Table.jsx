import React, { useState } from "react";
import axios from "axios";
import useMeterListData from "./hooks/useMeterListData";

const TableRow = ({ rowData }) => {
  const [limit, setLimit] = useState("");

  const handleSubmit = async () => {
    if (limit.length <= 0) {
      alert("please enter valid input");
      return;
    }
    const data = [
      { id: 119, meter_id: 333 },
      { id: 89, meter_id: 351 },
      { id: 122, meter_id: 331 },
      { id: 16, meter_id: 383 },
      { id: 125, meter_id: 355 },
      { id: 126, meter_id: 355 },
      { id: 127, meter_id: 355 },
      { id: 134, meter_id: 356 },
      { id: 144, meter_id: 355 },
      { id: 145, meter_id: 353 },
      { id: 131, meter_id: 330 },
      { id: 133, meter_id: 415 },
      { id: 105, meter_id: 335 },
      { id: 106, meter_id: 352 },
      { id: 121, meter_id: 357 },
      { id: 147, meter_id: 352 },
      { id: 149, meter_id: 352 },
      { id: 154, meter_id: 354 },
      { id: 155, meter_id: 260 },
      { id: 157, meter_id: 356 },
      { id: 158, meter_id: 356 },
      { id: 160, meter_id: 335 },
      { id: 161, meter_id: 394 },
    ];

    const alertId = data
      .filter((entry) => entry.meter_id === rowData.meter_id)
      .map((entry) => entry.id);

    const id = alertId[0];
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

      alert("Successful!");

      console.log("Response:", res.data);
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
  const data = useMeterListData();

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
              <th className="p-2 text-center">Limit</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <TableRow key={row.meter_id} rowData={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
