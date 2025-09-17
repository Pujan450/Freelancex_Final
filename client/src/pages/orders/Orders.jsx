// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import "./Orders.scss";

// const Orders = () => {
//   const currentUser =JSON.parse(localStorage.getItem("currentUser"));

// const navigate = useNavigate();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"], // depend on cat + sort
//     queryFn: () =>
//       newRequest
//         .get(
//           `/orders`
//         )
//         .then((res) => res.data),
//   });

//   const handleContact = async (order) => {
//   const sellerId = order.sellerId;
//   const buyerId = order.buyerId;
//   const id = sellerId + buyerId;

//   try {
//     const res = await newRequest.get(`/conversations/single/${id}`);
//     navigate(`/message/${res.data.id}`);   // ✅ fixed
//   } catch (err) {
//     if (err.response.status === 404) {
//       const res = await newRequest.post(`/conversations/`, {
//         to: currentUser.seller ? buyerId : sellerId,
//       });
//       navigate(`/message/${res.data.id}`); // ✅ fixed
//     }
//   }
// };

//   return (
//     <div className="orders">
//       {isLoading ? ("loading") :error ? ("error"):<div className="container">
//         <div className="title">
//           <h1>Orders</h1>
//         </div>
//         <table>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Contact</th>
//           </tr>
//           {data.map((order)=>(
//             <tr key={order._id}>
//             <td>
//               <img
//                 className="image"
//                 src={order.img}
//                 alt=""
//               />
//             </td>
//             <td>{order.title}</td>
//             <td>{order.price}</td>
//             <td>
//               <img className="message" src="./img/message.png" alt="" onClick={()=>handleContact(order)}/>
//             </td>
//           </tr>))}
          
//         </table>
//       </div>}
//     </div>
//   );
// };

// export default Orders;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import "./Orders.scss";

// const Orders = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const navigate = useNavigate();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
//   });

//   const handleContact = async (order) => {
//     const sellerId = order.sellerId;
//     const buyerId = order.buyerId;
//     const id = sellerId + buyerId;

//     try {
//       const res = await newRequest.get(`/conversations/single/${id}`);
//       navigate(`/message/${res.data.id}`);
//     } catch (err) {
//       if (err.response?.status === 404) {
//         const res = await newRequest.post(`/conversations/`, {
//           to: currentUser.seller ? buyerId : sellerId,
//         });
//         navigate(`/message/${res.data.id}`);
//       }
//     }
//   };

//   return (
//     <div className="orders">
//       {isLoading ? (
//         "loading..."
//       ) : error ? (
//         "error loading orders"
//       ) : (
//         <div className="container">
//           <div className="title">
//             <h1>Orders</h1>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Contact</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.length > 0 ? (
//                 data.map((order) => (
//                   <tr key={order._id}>
//                     <td>
//                       <img className="image" src={order.img} alt="" />
//                     </td>
//                     <td>{order.title}</td>
//                     <td>{order.price}</td>
//                     <td>
//                       <img
//                         className="message"
//                         src="./img/message.png"
//                         alt=""
//                         onClick={() => handleContact(order)}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No confirmed orders yet.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


    



// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import "./Orders.scss";

// const Orders = () => {
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => newRequest.get("/orders").then((res) => res.data),
//   });


//   return (
//     <div className="orders">
//       <h1>My Orders</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error loading orders</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Seller</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img src={order.img} alt={order.title} width="50" />
//                 </td>
//                 <td>{order.title}</td>
//                 <td>₹{order.price}</td>
//                 <td>{order.sellerId}</td>
//                 <td>{order.isCompleted ? "Completed" : "Pending"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Orders;



import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => res.data),
  });

  // Mutation to create or get a conversation
  const mutation = useMutation({
    mutationFn: async (userId) => {
      const res = await newRequest.post(`/conversations`, {
        to: userId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      navigate(`/message/${data.id}`);
    },
    onError: (err) => {
      console.error("Failed to start conversation:", err);
    },
  });

  const handleContact = (order) => {
    const otherUserId = currentUser.isSeller ? order.buyerId : order.sellerId;
    if (otherUserId) {
      mutation.mutate(otherUserId);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (!data || !Array.isArray(data)) {
    return <p>No orders found or data is in an invalid format.</p>;
  }

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>My Orders</h1>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt={order.title} />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      // The SCSS uses `.message` for the icon
                      className="message"
                      src="./img/message.png"
                      alt="message"
                      onClick={() => handleContact(order)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;