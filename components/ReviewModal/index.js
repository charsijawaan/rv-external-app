import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ setShowModal, onSubmitReview, reservationId }) => {
  const stars = Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* Content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200 ">
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
            {/* Body */}
            <div className="relative flex-auto  text-center">
              <div className="flex items-start mt-4 mb-2 ml-8">
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={
                        (hoverValue || rating) > index ? "#FFBA5A" : "#a9a9a9"
                      }
                      className="mr-[10px] cursor-pointer	"
                    />
                  );
                })}
              </div>

              <textarea
                placeholder="What's your experience?"
                className="rounded-[12px] border-solid border-2  p-[3em] my-[1em] mx-[2em]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-blueGray-200">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-2.5 py-2.5 text-center mr-2"
                onClick={() => {
                  onSubmitReview({ reservationId, rating, comment });
                }}
              >
                Submit
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-2.5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default ReviewModal;
