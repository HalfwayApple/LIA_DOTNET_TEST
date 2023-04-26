import React from "react";
import "./custom.css";
import BookingProvider from "./contexts/BookingProvider";
import BookingTable from "./components/BookingTable";
import Header from "./components/Header";

export default function App() {

  return (
    <BookingProvider>
      <Header />
      <BookingTable />
    </BookingProvider>
  );
}
