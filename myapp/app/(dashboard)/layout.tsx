import NavBar from "./_component/NavBar"
import SideBar from "./_component/SideBar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <NavBar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed z-50 inset-y-0">
            <SideBar />
        </div>
          <main className="md:pl-56 pt-[80px] h-full">{children}</main>
      </div>
    )
  }