import React from "react";
import "./custom.css";
import BookingProvider from "./contexts/BookingProvider";
import BookingTable from "./components/BookingTable";

export default function App() {

  return (
    <BookingProvider>
      <BookingTable />
    </BookingProvider>
  );
}
