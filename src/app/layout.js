import "./global.css"; // Import Tailwind styles
export const metadata = {
    title: "User Form",
    description: "A simple form with Next.js and FastAPI",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-gray-300 flex justify-center items-center min-h-screen">
          {children}
        </body>
      </html>
    );
  }
  