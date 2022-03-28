import { useState } from "react";
import Button from "../UI/Button";

const CancelTripModal = ({
  setShowModal,
  onCancelReservation,
  reservationId,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* Content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-2 border-b border-solid rounded-t border-blueGray-200 ">
              <svg
                className=" ml-[11em] mt-2 w-10 h-10 text-gray-400 dark:text-gray-200"
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
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-5 h-5"
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
            {/* Body */}
            <div className="relative flex-auto p-2 text-center">
              <p className="my-5 leading-relaxed text-blueGray-500 text-md ">
                Are you sure you want to delete this reservation?
              </p>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-blueGray-200">
              <Button
                buttonClasses="mr-2"
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => onCancelReservation(reservationId)}
              >
                Yes, I'm sure
              </Button>
              <Button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default CancelTripModal;
