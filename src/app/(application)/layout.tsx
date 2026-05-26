import MainLayout from "@/components/mainLayout/mainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <MainLayout>
        {children}
    </MainLayout>
  );
}
