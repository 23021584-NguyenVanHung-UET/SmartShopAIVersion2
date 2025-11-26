import Navbar from "@/components/home/Navbar";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* tránh nội dung bị đè bởi navbar fixed */}
            <div className="pt-24">
                {children}
            </div>
        </div>
    );
}
