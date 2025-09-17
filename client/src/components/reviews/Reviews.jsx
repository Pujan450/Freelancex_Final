import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import getCurrentUser from "../../utils/getCurrentUser";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(5);

  // Restore pending review if it exists
  useEffect(() => {
    const pending = localStorage.getItem("pendingReview");
    if (pending) {
      const { gigId: savedGig, desc, star } = JSON.parse(pending);
      if (savedGig === gigId) {
        setDesc(desc);
        setStar(star);
      }
      localStorage.removeItem("pendingReview");
    }
  }, [gigId]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      // Save draft before redirect
      localStorage.setItem(
        "pendingReview",
        JSON.stringify({ gigId, desc, star })
      );

      // Redirect to login and remember current location
      return navigate("/login", { state: { from: location } });
    }

    mutation.mutate({ gigId, desc, star });
    setDesc("");
    setStar(5);
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}

      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your opinion"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <select value={star} onChange={(e) => setStar(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
