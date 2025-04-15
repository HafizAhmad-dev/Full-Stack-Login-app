import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const device = await getDeviceInfo();
      setData((prev) => ({
        ...prev,
        ...device,
      }));
    };

    fetchDeviceInfo();
  }, []);



  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      mobile: navigator.userAgentData?.mobile ?? false,
      browserBrand: navigator.userAgentData?.brands?.[0]?.brand ?? "Unknown",
    };
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      deviceInfo: getDeviceInfo(),
    }));
  }, []);
  // Send data when the submit button is clicked
  const SendData = () => {
    if (data.name !== "" && data.password !== "") {
      fetch("http://192.168.0.104:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Sending data to backend
      })
        .then((response) => response.json()) // Parse JSON response
        .then((data) => {
          console.log(data);
          alert(`Name is ${data.name} and password is ${data.password}`); // Handle the response data from backend
          setData({
            name: "",
            password: "",
            deviceInfo: "",
          });
        })
        .catch((err) => console.log("Error:", err));
    } else {
      console.log("Please enter your credentials");
      alert("Please enter your credentials");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-purple-300 bg-white shadow-lg rounded-2xl flex flex-col justify-center items-center w-[300px] py-10 px-6"
      >
        <input
          className="input-field w-full px-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-400"
          type="text"
          placeholder="Enter your Name"
          value={data.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input-field w-full px-4 py-2 mt-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-400"
          type="password"
          placeholder="Enter your password"
          value={data.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button
          onClick={() => SendData()}
          className="mt-5 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-3xl transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
