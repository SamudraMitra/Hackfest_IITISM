import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ItemCard.css";
import axios from "axios";

const ItemCard = ({
  value,
  imgUrl,
  _id,
  item,
  price,
  startDate,
  endDate,
  type,
  postedBy,
}) => {
  const BACKEND_URL = "http://localhost:8000/getrequester";
  const [reqby, setReqBy] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  useEffect(() => {
    if (JSON.parse(localStorage["college_trader_data"])._id == postedBy) {
      if (type === "Rent" || type === "Buy") {
        setText1("Delete");
      }
      if (type === "Approved") setText1("Approved");
      if (type === "Requested") setText1("Approve");
    } else {
      setText1(type);
    }
  }, []);
  console.log(reqby);
  useEffect(() => {
    const fun = async () => {
      setReqBy(await axios.get(BACKEND_URL, { requestedBy: reqby }));
      console.log(
        await axios.get(BACKEND_URL, {
          requestedBy: "6430d9440038e89fbc520e01",
        })
      );
    };
    fun();
    console.log({
      lol: JSON.parse(localStorage["college_trader_data"])._id,
      postedBy,
    });
  }, []);
  const handleClick = (e) => {
    // if(e.target.value === '')
  };
  const handleApprove = (e) => {};
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card ">
        <img src={imgUrl} alt="" className="card-img-top" />

        <div className="class-body">
          <h3 className="card-title">{item}</h3>
          <p className="card-text">
            Price:{price}
            <br />
            Date Range:{startDate} - {endDate}
          </p>
        </div>
        <button
          onClick={(e) => {
            if (e.target.value === "Approve") {
            }
          }}
        >
          {text1}
        </button>
        {JSON.parse(localStorage["college_trader_data"])._id == postedBy &&
          type === "Requested" && <button onClick={() => {}}>Decline</button>}
        {/* {JSON.parse(localStorage["college_trader_data"])._id == postedBy
            ? type === "Requested"
              ? "Decline"
              : "Delete"
            : ""} */}
        {type === "Requested" && (
          <div>
            <p>Requested by: {reqby.name} </p>
            <p>Requested by: {reqby.phone} </p>
          </div>
        )}
      </div>
    </div>
  );
};

// const ItemCard = ({ item, price, startDate, endDate }) => {
//   return (
//     <Card className="my_card">
//       <CardContent>
//         <Typography variant="h5" component="h2">
//           {item}
//         </Typography>
//         <Typography color="textSecondary">Price: {price}</Typography>
//         <Typography color="textSecondary">
//           Date Range: {startDate} - {endDate}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

export default ItemCard;
