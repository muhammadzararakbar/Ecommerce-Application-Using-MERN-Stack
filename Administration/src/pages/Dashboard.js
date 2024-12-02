import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Bar, Pie } from "@ant-design/plots"; // Change from Column to Bar and Pie
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  // Dummy data for monthly, yearly, and order
  const monthlyDataState = [
    { _id: { month: 0 }, amount: 300, count: 20 },
    { _id: { month: 1 }, amount: 400, count: 25 },
    { _id: { month: 2 }, amount: 500, count: 30 },
    { _id: { month: 3 }, amount: 600, count: 35 },
    { _id: { month: 4 }, amount: 700, count: 40 },
    { _id: { month: 5 }, amount: 800, count: 45 },
    { _id: { month: 6 }, amount: 900, count: 50 },
    { _id: { month: 7 }, amount: 1000, count: 55 },
    { _id: { month: 8 }, amount: 1100, count: 60 },
    { _id: { month: 9 }, amount: 1200, count: 65 },
    { _id: { month: 10 }, amount: 1300, count: 70 },
    { _id: { month: 11 }, amount: 1400, count: 75 },
  ];

  const yearlyDataState = [{ amount: 10000, count: 120 }];

  const orderState = [
    {
      user: { firstname: "John", lastname: "Doe" },
      orderItems: [{}, {}, {}],
      totalPrice: 1500,
      totalPriceAfterDiscount: 1300,
      orderStatus: "Ordered",
    },
    {
      user: { firstname: "Jane", lastname: "Smith" },
      orderItems: [{}, {}],
      totalPrice: 1000,
      totalPriceAfterDiscount: 900,
      orderStatus: "Shipped",
    },
    {
      user: { firstname: "Jake", lastname: "Brown" },
      orderItems: [{}, {}],
      totalPrice: 2000,
      totalPriceAfterDiscount: 1800,
      orderStatus: "Delivered",
    },
  ];

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    // Dispatch actions to fetch real data
    // dispatch(getMonthlyData([34, 67, 78, 89]));
    // dispatch(getYearlyData(config3));
    // dispatch(getOrders(config3));
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Process monthly data
    let data = [];
    let monthlyOrderCount = [];
    if (monthlyDataState && Array.isArray(monthlyDataState)) {
      for (let index = 0; index < monthlyDataState.length; index++) {
        const element = monthlyDataState[index];
        data.push({
          type: monthNames[element?._id?.month],
          income: element?.amount,
        });
        monthlyOrderCount.push({
          type: monthNames[element?._id?.month],
          income: element?.count,
        });
      }
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    // Process order data
    const data1 = [];
    if (orderState && Array.isArray(orderState)) {
      for (let i = 0; i < orderState.length; i++) {
        data1.push({
          key: i,
          name:
            orderState[i].user.firstname + " " + orderState[i].user.lastname,
          product: orderState[i].orderItems?.length,
          price: orderState[i]?.totalPrice,
          dprice: orderState[i]?.totalPriceAfterDiscount,
          staus: orderState[i]?.orderStatus,
        });
      }
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState, orderState]);

  const configBar = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: "#1890ff", // Bar color
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const configPie = {
    appendPadding: 10,
    data: dataMonthlySales,
    angleField: "income",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}: {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              Rs.{yearlyDataState && yearlyDataState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.count}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income in Last Year from Today</h3>
          <div>
            <Bar {...configBar} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 ">
          <h3 className="mb-5 title">Sales in Last Year from Today </h3>
          <div>
            <Pie {...configPie} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
