
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { ComboboxButton } from "@/components/ui/combobox";
import { BarChartCustom } from "@/components/ui/barchart";
import { LineChartCustom } from "@/components/ui/linechart";
import { base_url } from "@/function";

export default function Home({ data }) {
  const [socket, setSocket] = useState(null);
  const [chartData, setChartData] = useState(data);
  const [selectedTimezone, setSelectedTimezone] = useState("");

  //initliaize socket
  const initializeSocket = () => {
    const newSocket = io(base_url);

    // Log connection events
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id); // Display the socket ID on successful connection
    });

    //on error
    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error); // Log connection errors
    });

    //on discconnected
    newSocket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason); // Log disconnection reasons
    });

    //on test
    newSocket.on("test", (message) => console.log(message));

    //receive data from socket 
    newSocket.on("timezone_data", (data) => {
      //format the data to the data that chart need
      const formattedData = data.data.map(item => ({
        created_at: item.created_at,
        value: item.value,
      }));
      //set to chart
      setChartData(formattedData);
    });

    setSocket(newSocket);
    return newSocket;
  };


  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map(item => ({
        created_at: item.created_at,
        value: item.value,
      }));

      setChartData(formattedData);
    }

    //initialize socket and get temperature data 
    const newSocket = initializeSocket();
    newSocket.emit("getTemperatureData");

    return () => {
      newSocket.disconnect();
    };
  }, [data]);


  // Update selectedTimezone when a new timezone is selected in ComboboxButton
  const onTimezoneSelect = (timezone) => {
    setSelectedTimezone(timezone);
  };

  return (
    <div className="flex w-full  md:items-center mt-5 justify-center h-screen px-2">
      <div className="text-center w-full md:w-auto">
        <div className="mb-5">
          {socket && (
            <ComboboxButton
              socket={socket}
              reconnectSocket={initializeSocket}
              onTimezoneSelect={onTimezoneSelect}
            />
          )}
        </div>
        {/* Responsive layout for charts */}
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
          <div className="w-full md:w-1/2">
            <BarChartCustom data={chartData} timezone={selectedTimezone} />
          </div>
          <div className="w-full md:w-1/2">
            <LineChartCustom data={chartData} timezone={selectedTimezone} />
          </div>
        </div>
      </div>
    </div>
  );

}

//load data using SSR
export async function getServerSideProps() {
  try {
    // Fetch initial data from your backend API
    const res = await fetch(base_url + "api/data"); // Adjust the endpoint as needed

    // Check if response is ok
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const initialData = await res.json();
    const data = initialData.data;

    return {
      props: { data }, // Pass the data to the component as props
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);

    // Return fallback data or an error flag
    return {
      props: { data: [], error: "Failed to load data" },
    };
  }
}
