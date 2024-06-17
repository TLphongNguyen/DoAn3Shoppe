import HeaderAdmin from "./headerAdmin";
import SideBar from "./sidebar";





function AdminLayout({ children }) {
    return (
        <div className="flex h-[920px]">
            <SideBar />
            <div className="wraper w-[100%] bg-[#f1f2f2]">
                <HeaderAdmin />
                <div className="content w-[100%] h-[100%] p-20 ">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
