import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  plugins,
} from "chart.js";
import "./UserPage.css";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [btnColor, setBtnColr] = useState(false);
  const [validVal, isvalidVal] = useState(true);
  const [editedValue, seteditValue] = useState({
    charge_customers: "",
    amount: {
      category_6: "",
      category_7: "",
      category_8: "",
      category_9: "",
      category_10: "",
    },
  });
  const priceBar = {
    category_6: 99,
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchApiCall(userId);
  }, []);

  const fetchApiCall = async (id) => {
    //  console.log("id",id);
    if (id) {
      const result = await fetch(`https://stg.dhunjam.in/account/admin/${id}`);
      const userInfo = await result.json();
      // console.log("whats userinfo",userInfo);
      if (userInfo.status === 200) {
        setUserData([userInfo.data]);
        seteditValue({
          charge_customers: userInfo.data.charge_customers,
          amount: { ...userInfo.data.amount },
        });
      }
    }
  };

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = parseInt(event.target.value,10);
    
    seteditValue({
      ...editedValue,
      amount: { ...editedValue.amount, [name]: value },
    });
  };

  const handleLabelChange = (event) => {
    // console.log("whta is labl val",event.target.value);
    if (event.target.value === "Yes") {
      isvalidVal(true);
      return;
    }
    isvalidVal(false);
  };

  const validateButton = () => {
    // console.log("isthis",editedValue.charge_customers==true);
    if (editedValue.charge_customers === true) {
      // console.log("wbdwbqdb");
      return (
        parseInt(editedValue.amount.category_6, 10) >= priceBar.category_6 &&
        parseInt(editedValue.amount.category_7, 10) >= priceBar.category_7 &&
        parseInt(editedValue.amount.category_8, 10) >= priceBar.category_8 &&
        parseInt(editedValue.amount.category_9, 10) >= priceBar.category_9 &&
        parseInt(editedValue.amount.category_10, 10) >= priceBar.category_10
      );
    }
    // console.log("dhwqq");
    return false;
  };

  const handleFormSubmit = async (userId) => {
    setBtnColr(true);
    // console.log("hello");
    if (userId) {
      const res = await fetch(
        `https://stg.dhunjam.in/account/admin/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedValue),
        }
      );
      const info = await res.json();
      // console.log("final info",info);
    if(info.status===200){
      alert("Data Updated Sucessfully!");
      await fetchApiCall(userId);
      return;
    }else{
      alert("There is Problem in Backend");
    }

    }
  };

  return (
    <div className="userBody">
      {userData.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <div className="userElement">
          <p
            style={{
              fontSize: "2rem",
              width: "37.5rem",
              textAlign: "center",
            }}
          >
            {userData[0].name}, {userData[0].location} on Dhun Jam
          </p>
          <div className="chargeClass">
            <p style={{ width: "40%" }}>
              Do you want to charge your customers for requesting songs?
            </p>
            <div style={{ columnGap: "1.5rem", display: "flex" }}>
              <div style={{ display: "flex" }}>
                <label>Yes</label>
                <input
                  name="user"
                  type="radio"
                  value="Yes"
                  onChange={handleLabelChange}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label>No</label>
                <input
                  name="user"
                  type="radio"
                  value="No"
                  onChange={handleLabelChange}
                />
              </div>
            </div>
          </div>
          <div className="customClass">
            <p>Customer song request amount-</p>
            <input
              style={
                validVal
                  ? {
                      color: "#FFFFFF",
                      backgroundColor: "transparent",
                      height: "2.5rem",
                      borderColor: "#FFFFFF",
                      borderRadius: "0.5rem",
                      width: "80%",
                    }
                  : {
                      color: "#C2C2C2",
                      borderColor: "#C2C2C2",
                      backgroundColor: "transparent",
                      height: "2.5rem",
                      borderRadius: "0.5rem",
                      width: "80%",
                    }
              }
              disabled={!validVal}
              name="category_6"
              defaultValue={userData[0].amount.category_6}
              onChange={handleFormChange}
              type="number"
            />
          </div>
          <div className="regularSongClass">
            <p>Regular song request amounts,from high to low-</p>
            <div style={{ display: "flex", columnGap: "2rem" }}>
              <input
                className={validVal ? "inputStyle" : "disableInputStyle"}
                disabled={!validVal}
                type="number"
                name="category_7"
                defaultValue={userData[0].amount.category_7}
                onChange={handleFormChange}
              />
              <input
                className={validVal ? "inputStyle" : "disableInputStyle"}
                disabled={!validVal}
                type="number"
                name="category_8"
                defaultValue={userData[0].amount.category_8}
                onChange={handleFormChange}
              />
              <input
                className={validVal ? "inputStyle" : "disableInputStyle"}
                disabled={!validVal}
                type="number"
                name="category_9"
                defaultValue={userData[0].amount.category_9}
                onChange={handleFormChange}
              />
              <input
                className={validVal ? "inputStyle" : "disableInputStyle"}
                disabled={!validVal}
                type="number"
                name="category_10"
                defaultValue={userData[0].amount.category_10}
                onChange={handleFormChange}
              />
            </div>
          </div>
          {/* {Graph} */}

          <div className={validVal ? "graphVisible" : "graphHidden"}>
            <Bar
              data={{
                labels: [
                  "custom",
                  "category_7",
                  "category_8",
                  "category_9",
                  "category_10",
                ],
                datasets: [
                  {
                    label: "",

                    data: [
                      parseInt(editedValue.amount.category_6, 10),
                      parseInt(editedValue.amount.category_7, 10),
                      parseInt(editedValue.amount.category_8, 10),
                      parseInt(editedValue.amount.category_9, 10),
                      parseInt(editedValue.amount.category_10, 10),
                    ],

                    backgroundColor: [
                      "#F0C3F1",
                      "#F0C3F1",
                      "#F0C3F1",
                      "#F0C3F1",
                    ],

                    borderWidth: 0.5,
                  },
                ],
              }}
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  xAxes: {
                    type: "category",
                    ticks: {
                      beginAtZero: true,
                    },
                    display: false,
                    scaleLabel: {
                      display: true,
                      labelString: "",
                    },
                  },

                  yAxes: {
                    ticks: {
                      beginAtZero: true,
                    },
                    display: false,
                    scaleLabel: {
                      display: true,
                      labelString: "",
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      boxWidth: 0,
                    },
                  },
                },
              }}
            />
          </div>

          {validVal ? (
            <button
              style={{
                height: "2.5rem",
                borderRadius: "0.5rem",
                backgroundColor: validateButton() ? "#6741D9" : "#C2C2C2",
                border: btnColor ? "2px solid #F0C3F1" : "",
                color: "#FFFFFF",
                marginTop: "2rem",
                width: "80%",
                cursor: "pointer",
              }}
              disabled={!validateButton()}
              onMouseOver={() => setBtnColr(true)}
              onMouseLeave={() => setBtnColr(false)}
              onClick={()=>handleFormSubmit(userId)}
            >
              Save
            </button>
          ) : (
            <button
              style={{
                height: "2.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#C2C2C2",
                color: "#000000",
                marginTop: "2rem",
                width: "80%",
                cursor: "not-allowed",
              }}
              disabled
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
