import React, { useEffect, useState } from "react";
import { singleStoreDetails, updateStoreDetails } from "./Slice/StoreSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateStore() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);

  const [addStores, setSddStores] = useState({
    title: "",
    store_title: "",
    description: "",
    image: "",
  });

  //   fetch Store Data
  useEffect(() => {
    return async () => {
      //   const payload = { ...addStores };
      const response = await dispatch(singleStoreDetails(id)).unwrap();
      setSddStores({
        ...addStores,
        title: response.data[0].title,
        store_title: response.data[0].store_title,
        description: response.data[0].description,
        image: response.data[0].image,
        id: id,
        userId: userInfo.id,
      });
    };
  }, []);

  //   update Store Details
  const newUpdateStore = async () => {
    try {
      const payload = { ...addStores };
      const response = await dispatch(
        updateStoreDetails({ id, payload })
      ).unwrap();
      if (response.data !== "") {
        navigate("/dashboard");
        toast.success("Store Data Update Successfully!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <div className="max-w-lg  mx-auto flex items-center justify-center w-full flex-wrap bg-white border border-[#E2E8F0] rounded-xl shadow-lg ">
        <form className="w-full space-y-5 p-5">
          <h1 className="text-4xl text-[#1E293B] font-bold text-center pb-5">
            Update Store
          </h1>
          <div>
            <label className="block text-sm text-[#1E293B] font-bold pb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={addStores.title}
              onChange={(e) => {
                setSddStores({ ...addStores, title: e.target.value });
              }}
              className="flex items-center w-full bg-transparent p-3.5 py-[13px] outline-none border border-[#E2E8F0] rounded-xl placeholder:text-[#94A3B8] placeholder:text-base"
              placeholder="Enter Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#1E293B] font-bold pb-1">
              Store Title
            </label>
            <input
              type="text"
              name="store_title"
              value={addStores.store_title}
              onChange={(e) => {
                setSddStores({ ...addStores, store_title: e.target.value });
              }}
              className="flex items-center w-full bg-transparent p-3.5 py-[13px] outline-none border border-[#E2E8F0] rounded-xl placeholder:text-[#94A3B8] placeholder:text-base"
              placeholder="Enter Store Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#1E293B] font-bold pb-1">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              rows={8}
              value={addStores.description}
              onChange={(e) => {
                setSddStores({ ...addStores, description: e.target.value });
              }}
              className="flex items-center w-full bg-transparent p-3.5 py-[13px] outline-none border border-[#E2E8F0] rounded-xl placeholder:text-[#94A3B8] placeholder:text-base"
              placeholder="Enter Description"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => newUpdateStore()}
            className="w-full block bg-[#71a73f] text-[#fff] border-[#71a73f] border hover:bg-[#71a73f] hover:text-white hover:border-[#71a73f] px-5 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold transition-all duration-300 rounded-[10px] w-ful uppercase leading-7 "
          >
            Update Store
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStore;
