import React, { useState } from "react";
import { addStore } from "./Slice/StoreSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddStore() {
  const [addStores, setSddStores] = useState({
    title: "",
    store_title: "",
    description: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);

  //   onchange handler
  const setFormField = (field, value) => {
    setSddStores({ ...addStores, [field]: value });
  };

  // Add store
  const handelAddTodo = async (e) => {
    const payload = { ...addStores, userId: userId.id, image: "" };
    if (
      addStores.title &&
      addStores.description &&
      addStore.store_title !== ""
    ) {
      try {
        const response = await dispatch(addStore(payload)).unwrap();
        if (response.data !== "") {
          navigate("../dashboard");
          toast.success("Add Store successful!");
        } else {
          toast.warn("Store Not Add!");
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.warn("Title & Store Title & Description Required");
    }
  };
  return (
    <div className="flex items-center h-screen">
      <div className="max-w-lg  mx-auto flex items-center justify-center w-full flex-wrap bg-white border border-[#E2E8F0] rounded-xl shadow-lg ">
        <form className="w-full space-y-5 p-5">
          <h1 className="text-4xl text-[#1E293B] font-bold text-center pb-5">
            Add Store
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
                setFormField("title", e.target.value);
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
                setFormField("store_title", e.target.value);
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
                setFormField("description", e.target.value);
              }}
              className="flex items-center w-full bg-transparent p-3.5 py-[13px] outline-none border border-[#E2E8F0] rounded-xl placeholder:text-[#94A3B8] placeholder:text-base"
              placeholder="Enter Description"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handelAddTodo()}
            className="w-full block bg-[#71a73f] text-[#fff] border-[#71a73f] border hover:bg-[#71a73f] hover:text-white hover:border-[#71a73f] px-5 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold transition-all duration-300 rounded-[10px] w-ful uppercase leading-7 "
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStore;
