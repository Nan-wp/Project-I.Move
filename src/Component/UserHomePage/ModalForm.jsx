import axios from "axios";
import React, { useState } from "react";

const initialValues = {
  id: undefined,
  activityName: "",
  activityType: "",
  date: "",
  durations: "",
  distance: "",
  description: "",
  files: undefined,
};

export default function ModalForm({
  closeModal,
  initialValue,
  formType,
  setMockCard,
  mockCard,
  handleConfirmDelete,
}) {
  const [inputData, setInputData] = useState(initialValue);
  const [imageFile, setImageFile] = useState();

  let idCounter = 10;

  const generateUniqueId = () => {
    idCounter += 1;
    return `00${idCounter}`; // adjust the format as needed
  };

  const handleOnChangeInputData = (key, value) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSummit = async () => {
    if (formType === "edit") {
      const updatedMockCard = mockCard.map((card) => {
        if (card.id === inputData.id) {
          // If the id matches, update the card with new data from inputData
          return {
            ...card,
            activityName: inputData.activityName,
            activityType: inputData.activityType,
            date: inputData.date,
            durations: inputData.durations,
            distance: inputData.distance,
            description: inputData.description,
          };
        } else {
          return card;
        }
      });
      // Now, updatedMockCard contains the array with the updated object
      setMockCard(updatedMockCard);
      setInputData(initialValues);
      closeModal();
    } else if (formType === "create") {
      const id = generateUniqueId();
      const formData = new FormData();
      formData.append("userId", "0128");
      // formData.append("id", id);
      formData.append("activityName", inputData.activityName);
      formData.append("activityType", inputData.activityType);
      formData.append("date", inputData.date);
      formData.append("durations", inputData.durations);
      formData.append("distance", inputData.distance);
      formData.append("description", inputData.description);
      formData.append("imageUrl", inputData.files);
      const res = await axios.post(`http://localhost:8000/post/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        console.log("Create Complete!");
      }
      setInputData(initialValues);
      closeModal();
    }
  };

  return (
    <div className="sm:grid-cols-2 p-4 ">
      <div className="flex justify-end cursor-pointer">
        <span class="material-icons-outlined" onClick={closeModal}>
          close
        </span>
      </div>
      <div className="flex flex-col justify-center bg-[#EADBC8]">
        <div className="flex justify-center">
          {formType === "edit" ? (
            <h1 className="font-bold text-[#102C57] text-3xl p-4">
              Edit Activity
            </h1>
          ) : (
            <h1 className="font-bold text-[#102C57] text-3xl p-4">
              Create Activity
            </h1>
          )}
        </div>
        <div className="p-4 text-center	text-[#102C57] font-semibold flex flex-col items-center">
          {imageFile ? (
            <div className="w-[300px] h-[200px] flex justify-center">
              <img src={imageFile} className="object-scale-down h-full  " />
            </div>
          ) : null}
          <label class="bg-[#102C57] hover:bg-cyan-600 duration-150 text-white font-semibold py-2 px-4 rounded cursor-pointer sm:w-1/4 ">
            <input
              type="file"
              class="inputfile"
              accept="image/png, image/gif, image/jpeg"
              onChange={(ev) => {
                if (ev) {
                  handleOnChangeInputData("files", ev.target.files[0]);
                  setImageFile(URL.createObjectURL(ev.target.files[0]));
                  console.log(ev.target.files[0]);
                }
              }}
            />{" "}
            Upload Image
          </label>
        </div>
      </div>
      <div className="grid sm:grid-cols-2  bg-[#EADBC8] ">
        <div className="p-4 text-[#102C57] font-semibold">
          <label for="Activity Name">Activity Name : </label>
          <input
            type="text"
            id="Activity Name"
            placeholder="Enter Activity Name"
            className="rounded-md p-2 peer-invalid:visible"
            onChange={(ev) =>
              handleOnChangeInputData("activityName", ev.target.value)
            }
            defaultValue={inputData.activityName}
          ></input>
        </div>
        <div className="p-4 text-[#102C57] font-semibold flex flex-col">
          <label for="Activity Type">Activity Type : </label>
          <select
            id="Activity Type"
            name="Activity Type"
            className="rounded-md p-2"
            onChange={(ev) =>
              handleOnChangeInputData("activityType", ev.target.value)
            }
            defaultValue={inputData.activityType}
          >
            <option value="Choose Activity">Choose Activity</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Badminton">Badminton</option>
            <option value="Walking">Walking</option>
          </select>
        </div>
        <div className="p-4 text-[#102C57] font-semibold flex flex-col">
          <label for="Date">Date : </label>
          <input
            type="date"
            name="Date"
            id="Date"
            className="rounded-md p-2"
            onChange={(ev) => handleOnChangeInputData("date", ev.target.value)}
            defaultValue={inputData.date}
          ></input>
        </div>
        <div className="p-4 text-[#102C57] font-semibold flex flex-col">
          <label for="Durations">Durations : </label>

          <select
            id="Durations"
            name="Durations"
            className="rounded-md p-2"
            onChange={(ev) =>
              handleOnChangeInputData("durations", ev.target.value)
            }
            defaultValue={inputData.durations}
          >
            <option value="Durations">Durations</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hr</option>
            <option value={120}>2 hr</option>
            <option value={180}>3 hr</option>
            <option value={240}>4 hr</option>
            <option value={350}>5 hr</option>
          </select>
        </div>
        <div className="p-4 text-[#102C57] font-semibold flex flex-col">
          <label for="Distance">Distance : </label>
          <select
            id="Distance"
            name="Distance"
            className="rounded-md p-2"
            onChange={(ev) =>
              handleOnChangeInputData("distance", ev.target.value)
            }
            defaultValue={inputData.distance}
          >
            <option value="Distance">Distance</option>
            <option value={0}>-</option>
            <option value={1000}>1 km</option>
            <option value={2000}>2 km</option>
            <option value={3000}>3 km</option>
            <option value={4000}>4 km</option>
            <option value={5000}>5 km</option>
            <option value={6000}>6 km</option>
            <option value={7000}>7 km</option>
            <option value={8000}>8 km</option>
            <option value={10000}>10 km</option>
            <option value={20000}>20 km</option>
          </select>
        </div>
        <div className="p-4 text-[#102C57] font-semibold flex flex-col">
          <label for="Description" className="">
            Description :
          </label>
          <textarea
            id="Description"
            name="Description"
            className="rounded-md"
            placeholder="How you feeling today? 😊"
            onChange={(ev) =>
              handleOnChangeInputData("description", ev.target.value)
            }
            defaultValue={inputData.description}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-[#102C57] rounded-lg text-white font-medium p-1 m-4 hover:bg-cyan-600 w-1/4"
          onClick={handleSummit}
        >
          Summit
        </button>
      </div>
      {formType === "edit" ? (
        <div className="flex justify-end cursor-pointer ">
          <span
            className="material-icons-outlined"
            onClick={() => handleConfirmDelete(inputData.id)}
          >
            delete_sweep
          </span>
        </div>
      ) : null}
    </div>
  );
}
