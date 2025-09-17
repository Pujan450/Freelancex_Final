import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./Review.scss";

const Review = ({ review, allowCreate = false }) => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Use /users/:id/public for safe fetch
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}/public`).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", review.gigId]);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Delete this review?")) {
      deleteMutation.mutate(review._id);
    }
  };

  // ✅ Redirect to login if not logged in but tries to add review
  const handleCreateReview = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      // open your create review form/modal here
      console.log("Open review form...");
    }
  };

  return (
    <div className="review">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavtar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="star" key={i} />
          ))}
        <span>{review.star}</span>
      </div>

      <p>{review.desc}</p>

      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>

      {/* Delete button only for review owner */}
      {currentUser && currentUser._id === review.userId && (
        <button className="deleteBtn" onClick={handleDelete}>
          Delete Review
        </button>
      )}

      {/* Optional "Add Review" button if passed allowCreate */}
      {allowCreate && (
        <button className="createBtn" onClick={handleCreateReview}>
          Add Review
        </button>
      )}
    </div>
  );
};

export default Review;
