
import localFont from "next/font/local";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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

  const initializeSocket = () => {
    const newSocket = io(base_url);

    // Log connection events
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id); // Display the socket ID on successful connection
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error); // Log connection errors
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason); // Log disconnection reasons
    });

    newSocket.on("test", (message) => console.log(message));

    newSocket.on("timezone_data", (data) => {
      const formattedData = data.data.map(item => ({
        created_at: item.created_at,
        value: item.value,
      }));
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

    const newSocket = initializeSocket();
    console.log('test');
    console.log(newSocket);
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
    <div className="flex w-full items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-5">
          {socket && (
            <ComboboxButton
              socket={socket}
              reconnectSocket={initializeSocket}
              onTimezoneSelect={onTimezoneSelect} // Pass onTimezoneSelect here
            />
          )}
        </div>
        <div className="flex gap-2">
          <BarChartCustom data={chartData} timezone={selectedTimezone} />
          <LineChartCustom data={chartData} timezone={selectedTimezone} />
        </div>
      </div>
    </div>
  );
}

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
