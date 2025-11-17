import React from "react";

const TertimonialCard = ({ review }) => {
  return (
    <div>
      <div className="w-full bg-base-100 shadow-md rounded-xl p-6 border border-gray-200">
        {/* Quote Icon */}
        <div className="text-primary text-4xl mb-3">❝</div>

        {/* Quote Text */}
        <p className="text-gray-600 mb-6 leading-relaxed">{review.review}</p>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-900">
            <img src={review.user_photoURL} className="rounded-3xl" alt="" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
            <p className="text-sm text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TertimonialCard;
