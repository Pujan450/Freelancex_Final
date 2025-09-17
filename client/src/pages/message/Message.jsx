// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Message.scss";

// const Message = () => {
//   const { id } = useParams(); // conversationId from URL
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const queryClient = useQueryClient();

//   // ✅ Fetch messages by conversationId
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["messages", id], 
//     queryFn: async () => {
//       const res = await newRequest.get(`/messages/${id}`);
//       return res.data; // return only data
//     },
//     enabled: !!id, // don't run until id exists
//   });

//   // ✅ Send message mutation
//   const mutation = useMutation({
//     mutationFn: async (message) => {
//       const res = await newRequest.post(`/messages`, message);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["messages", id]); // refresh after sending
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const text = e.target[0].value.trim();
//     if (!text) return;

//     mutation.mutate({
//       conversationId: id,
//       userId: currentUser._id, // identify sender
//       desc: text,
//     });

//     e.target[0].value = "";
//   };

//   return (
//     <div className="message">
//       <div className="container">
//         <span className="breadcrumbs">
//           <Link to="/messages">Messages</Link> &gt; Conversation &gt;
//         </span>

//         {/* Message List */}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error loading messages</p>
//         ) : data && data.length > 0 ? (
//           <div className="messages">
//             {data.map((m) => (
//               <div
//                 className={m.userId === currentUser._id ? "owner item" : "item"}
//                 key={m._id}
//               >
//                 <img
//                   src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                   alt="user"
//                 />
//                 <p>{m.desc}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No messages yet. Start the conversation!</p>
//         )}

//         <hr />

//         {/* Write Message */}
//         <form className="write" onSubmit={handleSubmit}>
//           <textarea placeholder="Write a message..." />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Message;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import getCurrentUser from "../../utils/getCurrentUser";

const Message = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  // Fetch messages by conversationId
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const res = await newRequest.get(`/messages/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Send message mutation
  const mutation = useMutation({
    mutationFn: async (message) => {
      const res = await newRequest.post(`/messages`, message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value.trim();
    if (!text) return;

    mutation.mutate({
      conversationId: id,
      desc: text,
    });

    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; Conversation &gt;
        </span>

        {/* Message List */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading messages</p>
        ) : data && data.length > 0 ? (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="user"
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}

        <hr />

        {/* Write Message */}
        <form className="write" onSubmit={handleSubmit}>
          <textarea placeholder="Write a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;