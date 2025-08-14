import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/layout/header";
import CardsGrid from "./layout/cards-grid";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <CardsGrid />
    </ThemeProvider>
  );
}

export default App;
