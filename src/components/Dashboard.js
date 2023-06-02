import React, { useEffect } from "react";
import bgImg from "../Assets/images/img.png";
import storeIcon from "../Assets/images/storeIcon.png";
import rightArrow from "../Assets/images/right-arrow.png";
import Header from "./Header";
import { fetchStoreDetails } from "./Slice/StoreSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);
  const storeDetails = useSelector((state) => state.storeSlices.store);

  // fetch user wise Store
  const fetchStores = async () => {
    try {
      await dispatch(fetchStoreDetails(userId.id)).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    return () => {
      fetchStores();
    };
  }, []);

  return (
    <>
      <Header />
      <button
        onClick={() => navigate("/addstore")}
        className="flex mx-auto bg-[#71a73f] text-white rounded-lg text-base font-bold px-3 py-2 mb-4"
      >
        Add Store
      </button>
      <div className="listWarpper">
        {storeDetails?.map((data, i) => (
          <div key={i} className="listBox cursor-pointer">
            <div onClick={() => navigate(`../listdetail/${data.id}`)}>
              <div className="listItems flex items-center">
                <img
                  src={data?.image !== "" ? data?.image : bgImg}
                  alt="bgImages"
                />
                <div className="listContent">
                  <h2>{data?.title || "DEAL_TITLE"}</h2>
                  <h3>
                    <img src={storeIcon} alt="storeIcon" />
                    {data?.store_title || "store_title"}
                  </h3>
                </div>
              </div>
              <img className="arrowIcon" src={rightArrow} alt="Arrow" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
