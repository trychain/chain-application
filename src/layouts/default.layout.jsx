// packages
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// styles
import "../styles/font.style.css";
import "../styles/typeography.style.css";

export default function DefaultLayout({ children }) {
  return (
    <main
      style={{
        minHeight: "100vh",
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "bg-body-tertiary text-body",
          duration: 5000,
          style: {},
        }}
      />

      <Outlet />
    </main>
  );
}
