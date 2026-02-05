import React, { useState } from "react";
import Assignment1 from "./Assignment1/Assignment1";
import Assignment2 from "./Assignment2/Assignment2";

function App() {
  const [activeTab, setActiveTab] = useState("assignment1");

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <button
          className={`nav-button ${activeTab === "assignment1" ? "active" : ""}`}
          onClick={() => setActiveTab("assignment1")}
        >
          作業 1: 計數器實作
        </button>
        <button
          className={`nav-button ${activeTab === "assignment2" ? "active" : ""}`}
          onClick={() => setActiveTab("assignment2")}
        >
          作業 2: 氣象數據分析
        </button>
      </nav>

      <main className="content-area">
        {activeTab === "assignment1" ? (
          <div className="assignment1-root">
            <Assignment1 />
          </div>
        ) : (
          <div className="assignment2-root">
            <Assignment2 />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
