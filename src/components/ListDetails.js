import React, { useEffect, useState } from "react";
import leftArrow from "../Assets/images/left-arrow.png";
import bgImg from "../Assets/images/img.png";
import storeIcon from "../Assets/images/storeIcon.png";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStore, singleStoreDetails } from "./Slice/StoreSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function ListDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // fetch Single Store
  const singleStores = async () => {
    try {
      const response = await dispatch(singleStoreDetails(id)).unwrap();
      setData(response.data[0]);
    } catch (error) {
      toast.error(error);
    }
  };

  // Store Delete
  const handelStoreDelete = async (id) => {
    try {
      const response = await dispatch(deleteStore(id)).unwrap();
      if (response.data !== "") {
        toast.success("Store Delete Successfully!");
        navigate("../dashboard");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    return () => {
      singleStores();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="listWarpper">
        <div className="listBox singleList">
          <Link to={"../dashboard"} className="backToPage">
            <img src={leftArrow} alt="Left Arrow" /> Back to Deals List
          </Link>
          <div className="listItems">
            <img
              src={data?.image !== "" ? data?.image : bgImg}
              alt="bgImage"
              className="w-full max-h-[342px] h-full"
            />
            <div className="listContent">
              <h2>{data?.title || "deal_title"}</h2>
              <h3>
                <img src={storeIcon} alt="storeIcon" />
                {data?.store_title || "store_details"}
              </h3>
              <p>{data?.description || "No Description"}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-5">
            <button
              onClick={() => navigate(`../updatestore/${data.id}`)}
              className="flex bg-[#71a73f] text-white rounded-lg text-base font-bold px-3 py-2 mb-2"
            >
              Edit Store
            </button>
            <button
              onClick={() => handelStoreDelete(data.id)}
              className="flex bg-red-700 text-white rounded-lg text-base font-bold px-3 py-2 mb-2"
            >
              Delete Store
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListDetails;
