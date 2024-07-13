import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ParentElement() {
 
  return (
    <>
    <Sidebar/>
    <div className="w-[87%] ml-auto p-4">
      <Outlet />
    </div>
    </>
  );
}

export default ParentElement;
