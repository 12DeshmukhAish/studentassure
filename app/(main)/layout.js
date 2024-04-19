import Sidebar from "@/components/superadmin";

export default function RootLayout({ children }) {
  return (<div className="flex">
    <Sidebar/>
      {children}
      </div>
  );
}
