import SideBar from "./_component/SideBar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='h-full flex items-center justify-center'>
        <div className="hidden md:flex h-full w-56 flex-col fixed z-50 inset-y-0">
            <SideBar />
        </div>
          {children}
      </div>
    )
  }