import HeaderAdmin from "./headerAdmin";
import SideBar from "./sidebar";





function AdminLayout({ children }) {
    return (
        <div>
            <HeaderAdmin />
            <div className="wraper flex">
                <SideBar />
                <div className="content w-[100%] p-20">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
