import Navbar from "@/components/home/Navbar";

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-24"> {/* tránh đè lên navbar fixed */}
                {children}
            </div>
        </div>
    );
}
