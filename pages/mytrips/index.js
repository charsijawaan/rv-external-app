import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { camperStore } from "../../store/camperStore";
import { getTrips, cancelReservation } from "../../services/camper";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import Button from "./../../components/UI/Button";
import toast from "react-hot-toast";

const MyTripsPage = () => {
  const router = useRouter();
  const camper = camperStore.useState((s) => s.camper);
  const [selectedTab, setSelectedTab] = useState("current");

  const [reservations, setReservations] = useState({
    current: [],
    upcoming: [],
    history: [],
  });
  const [showModal, setShowModal] = useState(false);

  const refetchTrips = async () => {
    const res = await getTrips(camper._id);
    const reservations = res.data.reservations;

    let today = new Date();
    let currentTemp = [];
    let upcomingTemp = [];
    let historyTemp = [];

    for (let i = 0; i < reservations?.length; i++) {
      let startDate = new Date(reservations[i].arrivalDate);
      let endDate = new Date(reservations[i].departureDate);

      if (today > endDate) {
        historyTemp.push(reservations[i]);
      } else if (today < startDate) {
        upcomingTemp.push(reservations[i]);
      } else if (startDate < today && endDate > today) {
        currentTemp.push(reservations[i]);
      }
    }

    setReservations({
      current: currentTemp,
      upcoming: upcomingTemp,
      history: historyTemp,
    });
  };

  const onCancelReservation = async (reservationId) => {
    const res = await cancelReservation({
      reservationId: reservationId,
    });
    if (res.status === 200) {
      toast.success(res.data.message);
      refetchTrips();
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    if (!camper) router.push("/login");
    refetchTrips();
  }, []);

  return (
    <>
      <div className="flex px-2 py-4 md:px-10 lg:px-14 xl:px-24">
        <ul className="flex flex-wrap border border-gray-200 rounded-md shadow-md">
          {/* Current */}
          <li className="mr-2">
            <a
              className={classNames(
                "inline-block px-4 py-4 text-sm font-medium text-center rounded-t-lg cursor-pointer",
                selectedTab === "current"
                  ? "bg-airbnb-red text-white"
                  : "text-black"
              )}
              onClick={() => setSelectedTab("current")}
            >
              Current
            </a>
          </li>

          {/* Upcoming */}
          <li className="mr-2">
            <a
              className={classNames(
                "inline-block px-4 py-4 text-sm font-medium text-center text-white rounded-t-lg cursor-pointer",
                selectedTab === "upcoming"
                  ? "bg-airbnb-red text-white"
                  : "text-black"
              )}
              onClick={() => setSelectedTab("upcoming")}
            >
              Upcoming
            </a>
          </li>

          {/* History */}
          <li className="">
            <a
              className={classNames(
                "inline-block px-4 py-4 text-sm font-medium text-center text-white rounded-t-lg cursor-pointer",
                selectedTab === "history"
                  ? "bg-airbnb-red text-white"
                  : "text-black"
              )}
              onClick={() => setSelectedTab("history")}
            >
              History
            </a>
          </li>
        </ul>
      </div>
      <div className="flex px-2 py-4 md:px-10 lg:px-14 xl:px-24">
        <div className="w-full overflow-x-auto">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="py-3 pr-16">Name</th>
                <th className="py-3 pr-16">Address</th>
                <th className="py-3 pr-16">Arrival & Departure</th>
                <th className="py-3 pr-16">Total Cost</th>
                {selectedTab === "upcoming" && (
                  <th className="py-3 pr-16">Cancel</th>
                )}
              </tr>
            </thead>
            <tbody>
              {selectedTab === "current" && (
                <>
                  {reservations.current?.map((r) => (
                    <tr>
                      <td className="py-3 pr-16">{r.tenantId.name}</td>
                      <td className="py-3 pr-16">{r.tenantId.address}</td>
                      <td className="py-3 pr-16">
                        {moment(r.arrivalDate).format("YYYY-MM-DD")} &{" "}
                        {moment(r.departureDate).format("YYYY-MM-DD")}
                      </td>
                      <td className="py-3 pr-16">-</td>
                    </tr>
                  ))}
                </>
              )}
              {selectedTab === "upcoming" && (
                <>
                  {reservations.upcoming?.map((r) => (
                    <tr>
                      <td className="py-3 pr-16">{r.tenantId.name}</td>
                      <td className="py-3 pr-16">{r.tenantId.address}</td>
                      <td className="py-3 pr-16">
                        {moment(r.arrivalDate).format("YYYY-MM-DD")} &{" "}
                        {moment(r.departureDate).format("YYYY-MM-DD")}
                      </td>
                      <td className="py-3 pr-16">-</td>
                      <td className="py-3 pr-16">
                        <Button onClick={() => setShowModal(true)}>
                          <MdDelete
                            style={{
                              fontSize: 18,
                              color: "#fff",
                            }}
                          />
                        </Button>{" "}
                        <>
                          {showModal ? (
                            <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t ">
                                      <svg
                                        class="mx-auto mb-4 ml-[10em] mt-5 w-14 h-14 text-gray-400 dark:text-gray-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                      </svg>

                                      <button
                                        type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => setShowModal(false)}
                                      >
                                        <svg
                                          class="w-5 h-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-4 flex-auto text-center">
                                      <p className="my-5 text-blueGray-500 text-md leading-relaxed">
                                        Are you sure you want to delete this
                                        reservation?
                                      </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                      <button
                                        data-modal-toggle="popup-modal"
                                        type="button"
                                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={() =>
                                          onCancelReservation(r._id)
                                        }
                                      >
                                        Yes, I'm sure
                                      </button>
                                      <button
                                        data-modal-toggle="popup-modal"
                                        type="button"
                                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={() => setShowModal(false)}
                                      >
                                        No, cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                          ) : null}
                        </>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {selectedTab === "history" && (
                <>
                  {reservations.history?.map((r) => (
                    <tr>
                      <td className="py-3 pr-16">{r.tenantId.name}</td>
                      <td className="py-3 pr-16">{r.tenantId.address}</td>
                      <td className="py-3 pr-16">
                        {moment(r.arrivalDate).format("YYYY-MM-DD")} &{" "}
                        {moment(r.departureDate).format("YYYY-MM-DD")}
                      </td>
                      <td className="py-3 pr-16">-</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyTripsPage;
