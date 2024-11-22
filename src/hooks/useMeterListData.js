import { useEffect, useState } from "react";

function useMeterListData(refresh) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_NBSENSE_DOMAIN}/water_ms/water_list_data`
      , {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json())
      .then((response) => setData(response))

    fetch(`${import.meta.env.VITE_NBSENSE_DOMAIN}/water_ms/alert_list`
      , {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json())
      .then((response) => setData2(response))
  }, [refresh])

  // Create a map of data2 objects by meter_id for quick lookup
  const data2Map = data2.reduce((acc, item) => {
    acc[item.meter_id] = { maximum_threshold: item.maximum_threshold, alert_id: item.id };
    return acc;
  }, {});

  // Add maximum_threshold and alert_id to data1 objects where meter_id matches
  const updatedData1 = data.map(item => {
    if (data2Map[item.meter_id] !== undefined) {
      return {
        ...item,
        maximum_threshold: data2Map[item.meter_id].maximum_threshold,
        alert_id: data2Map[item.meter_id].alert_id
      };
    }
    return item;
  });

  updatedData1.sort((a, b) => a.meter_id - b.meter_id);

  return updatedData1;
}

export default useMeterListData;