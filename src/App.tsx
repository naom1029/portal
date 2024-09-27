import Header from "./components/Header";
import ShortcutSection from "./components/ShortcutSection";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShortcutSection />
        </div>
      </main>
    </div>
  );
}
