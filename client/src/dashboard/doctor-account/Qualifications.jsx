import { useState } from "react";

import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

import useFetchData from "../../hooks/useFetchData";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { formateDate } from "../../utils/formatDate";

const Qualifications = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    doctor: user._id,
    startingDate: null,
    endingDate: null,
    school: "",
    location: "",
    degree: "",
    fieldStudy: "",
  });

  const {
    data: qualifications,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/qualifications/my-qualification`);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/qualifications/add-qualification`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setShowModal(false);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-0 lg:w-full">
      {!loading && !error && qualifications.length === 0 && (
        <div className="text-right">
          <button
            className={`${
              loading && "hidden"
            } bg-primaryColor text-white text-[16px] leading-7 rounded-lg p-4 m-auto`}
            type="submit"
            onClick={() => setShowModal(true)}
          >
            You do not have any qualification yet! Add?
          </button>
        </div>
      )}
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && qualifications.length > 0 && (
        <div className="rounded-lg shadow-2xl lg:w-full p-7">
          <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Education Info
          </h2>
          <table
            className={`${
              loading && "hidden"
            } w-full text-sm text-left border-2 text-headingColor`}
          >
            <thead className="text-xs uppercase">
              <tr>
                <th scope="col" className="w-1/3 px-6 py-3">
                  Date From - To
                </th>
                <th scope="col" className="px-6 py-3">
                  Major
                </th>
                <th scope="col" className="px-6 py-3">
                  University
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="">
              {qualifications.map((qualification) => (
                <tr
                  key={qualification.id}
                  className="border-b text-headingColor"
                >
                  <th scope="row" className="px-6 py-4 font-normal">
                    {formateDate(qualification.startingDate)} -{" "}
                    {formateDate(qualification.endingDate)}
                  </th>
                  <td className="px-6 py-4 font-normal">
                    {qualification.degree} - {qualification.fieldStudy}
                  </td>
                  <td className="px-6 py-4 font-normal">
                    {qualification.school}
                  </td>
                  <td className="px-6 py-4 font-normal">
                    {qualification.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full mt-5 text-right">
            {!loading && !error && qualifications.length > 0 && (
              <button
                className={`${
                  loading && "hidden"
                } w-[200px] bg-primaryColor text-white text-[16px] leading-7 rounded-lg px-4 py-2`}
                type="submit"
                onClick={() => setShowModal(true)}
              >
                Add Qualification
              </button>
            )}
            {showModal ? (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none">
                  <form
                    onSubmit={submitHandler}
                    className="relative mx-auto my-6 md:w-full md:max-w-4xl"
                  >
                    {/* <div className="relative w-full max-w-4xl mx-auto my-6"> */}
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 font-normal border-b border-solid rounded-t text-headingColor border-blueGray-200">
                        <h3 className="text-3xl font-semibold">
                          Qualification data
                        </h3>
                        <button
                          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="flex flex-auto flex-grow p-6">
                        <form
                          className="w-full max-w-3xl mx-auto justify-evenly"
                          action=""
                        >
                          <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="flex mb-5">
                              <input
                                type="date"
                                name="startingDate"
                                placeholder="Starting Date"
                                onChange={handleInputChange}
                                required
                                className="form__input"
                              />
                            </div>
                            <div className="flex mb-5">
                              <input
                                type="date"
                                name="endingDate"
                                placeholder="Ending Date"
                                onChange={handleInputChange}
                                required
                                className="form__input"
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="flex mb-5">
                              <input
                                type="text"
                                name="school"
                                placeholder="School*"
                                onChange={handleInputChange}
                                required
                                className="form__input"
                              />
                            </div>
                            <div className="flex mb-5">
                              <input
                                type="text"
                                name="location"
                                placeholder="Location*"
                                onChange={handleInputChange}
                                required
                                className="form__input"
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="flex mb-5">
                              <input
                                type="text"
                                name="degree"
                                onChange={handleInputChange}
                                placeholder="Degree*"
                                className="form__input"
                              />
                            </div>
                            <div className="flex mb-5">
                              <input
                                type="text"
                                name="fieldStudy"
                                onChange={handleInputChange}
                                placeholder="Field of study*"
                                className="form__input"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                        <button
                          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-400 rounded hover:bg-red-700"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-400 rounded hover:bg-primaryColor"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </form>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25 "></div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Qualifications;
