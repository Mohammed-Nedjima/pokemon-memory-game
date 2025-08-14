import ModeToggle from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className=" py-4 bg-card shadow-md">
      <div className="flex justify-between items-center custom-container ">
        <h1 className="text-xl font-bold">Pokemon Memory Game</h1>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
