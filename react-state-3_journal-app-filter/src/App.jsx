import { useState } from "react";
import EntriesSection from "./components/EntriesSection";
import EntryForm from "./components/EntryForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { uid } from "uid";
import "./App.css";

const initialEntries = [
  {
    id: 1000,
    date: "Feb 5, 2025",
    motto: "We are in a state of chaos",
    notes:
      "Today I learned about React State. It was fun! I can't wait to learn more.",
    isFavorite: false
  },
  {
    id: 999,
    date: "Feb 4, 2025",
    motto: "Props, Props, Props",
    notes:
      "Today I learned about React Props. Mad props to everyone who understands this!",
    isFavorite: false
  },
  {
    id: 998,
    date: "Feb 3, 2025",
    motto: "How to nest components online fast",
    notes:
      "Today I learned about React Components and how to nest them like a pro. Application design is so much fun!",
    isFavorite: false
  },
  {
    id: 997,
    date: "Feb 2, 2025",
    motto: "I'm a React Developer",
    notes: "My React-ion when I learned about React: Yay!",
    isFavorite: true,
  },
];

function App() {
  const [entries, setEntries] = useState(initialEntries);

  function handleAddEntry(newEntry) {
    const date = new Date().toLocaleDateString("en-us", {
      dateStyle: "medium",
    });
    setEntries([{ id: uid(), date, ...newEntry }, ...entries]);
  }

  function handleToggleFavorite(id) {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
      )
    );
  }

  const filterOptions = {all: "all", favorites:"favorites"}
  const [filter, setFilter] = useState("all");

  // Create a function called handleShowFavoriteEntries which sets the filter state to "favorites".
  function handleShowFavoriteEntries() {
    setFilter(filterOptions.favorites);
  }

  // Create a function called handleShowAllEntries which sets the showFavorites state to "all".
  function handleShowAllEntries() {
    setFilter(filterOptions.all);
  }

  let favoriteEntries = [...entries.filter((entry) => entry.isFavorite === true )];

  const toggleEntries = () => {
    switch (filter){
      case filterOptions.all:
        return entries
      case filterOptions.favorites:
        return favoriteEntries
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <EntryForm onAddEntry={handleAddEntry} />
        <EntriesSection
          entries={toggleEntries()}
          filter={filter}
          onToggleFavorite={handleToggleFavorite}
          onShowAllEntries={handleShowAllEntries}
          onShowFavoriteEntries={handleShowFavoriteEntries}
          allEntriesCount={entries.length}
          favoriteEntriesCount={favoriteEntries.length}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
