import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import { Package, ShoppingCart } from "lucide-react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";

const YourOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.get_order.url, {
      method: SummaryApi.get_order.method,
      credentials: "include",
    });
    const dataResponse = await response.json();
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const groupedOrders = data.reduce((acc, order) => {
    const date = moment(order.createdAt).format("LL");
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  const groupedDates = Object.keys(groupedOrders);

  return (
    <div className="min-h-screen py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
        Your Orders 🛍️
      </h1>

      {
        !data[0] && (
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center mx-auto mt-16 border border-gray-100">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-12 h-12" style={{ color: "#efa92a" }} strokeWidth={1.5}/>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">
              No Orders Yet
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <Link to={"/"} className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Start Shopping <KeyboardDoubleArrowRightIcon />
            </Link>
          </div>
        )
      }

      {
        data[0] && (
          <div className="max-w-6xl mx-auto">
            {
              groupedDates.map((date, index) => (
                <div key={index} className="mb-10">
                  <p className="font-semibold mb-5 text-2xl text-slate-800 border-b-2 border-orange-300 inline-block">
                    {date}
                  </p>

                  <div className="border border-gray-200 rounded-2xl bg-white shadow-md">
                    {
                      groupedOrders[date].map((order, index) => (
                        <div key={order.userId + index} className="border-b last:border-b-0">
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 gap-6">
                            <div className="grid gap-4 w-full">
                              {
                                order?.productDetails.map((product, index) => (
                                  <div key={product.productId + index} className="flex gap-4 bg-white items-center border-b last:border-b-0 pb-3">
                                    <img
                                      src={product.image[0]}
                                      className="w-24 h-24 object-contain rounded-lg border p-2 bg-gray-50"
                                      alt={product.name}
                                    />
                                    <div>
                                      <div className="font-semibold text-lg text-slate-800 line-clamp-1 capitalize">
                                        {product.name}
                                      </div>
                                      <div className="flex items-center gap-4 mt-2">
                                        <div className="text-lg font-semibold" style={{color: "#be800e"}}>
                                          {DisplayINRCurrency(product.price)}
                                        </div>
                                      </div>
                                      <p className="mt-2 text-gray-600">
                                        <span className="font-semibold text-slate-700">
                                          Quantity:
                                        </span>{" "}
                                        {product.quantity}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>

                            <div className="flex flex-col sm:flex-row gap-10 p-2 min-w-[300px] justify-center text-gray-700">
                              <div>
                                <div className="text-lg font-semibold text-slate-800 mb-1">
                                  Shipping Details:
                                </div>
                                {
                                  order.shipping_options.map((shipping, index) => (
                                    <div key={shipping.shipping_rate} className="ml-1 text-gray-600">
                                      Shipping Amount:{" "}
                                      <span className="font-medium text-slate-700">
                                        {DisplayINRCurrency(shipping.shipping_amount)}
                                      </span>
                                    </div>
                                  ))
                                }
                              </div>

                              <div>
                                <div className="text-lg font-semibold text-slate-800 mb-1">
                                  Payment Details:
                                </div>
                                <p className="ml-1 capitalize text-gray-600">
                                  Payment Method:{" "}
                                  <span className="font-medium text-slate-700">
                                    {
                                      order.paymentDetails.payment_method_type[0]
                                    }
                                  </span>
                                </p>
                                <p className="ml-1 capitalize text-gray-600">
                                  Payment Status:{" "}
                                  <span
                                    className={`font-semibold ${
                                      order.paymentDetails.payment_status === "paid"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {order.paymentDetails.payment_status}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="font-semibold text-lg text-right pr-8 pb-4 text-slate-800">
                            Total Amount:{" "}
                            <span className="text-orange-600">
                              {DisplayINRCurrency(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default YourOrders;