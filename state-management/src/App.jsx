import { useState } from "react";
import "./App.css";

//main app function that runs a prop to set minimum damage to 5 and maximum to 20
function App({ minDamage = 5, maxDamage = 20 }) {
  //define starting values when the game first loads
  const [playerHealth, setPlayerHealth] = useState(100); //Players health starts at 100
  const [enemyHealth, setEnemyHealth] = useState(100); // Ememys health starts at 100
  const [gameStatus, setGameStatus] = useState("active"); // the game starts as active

  //Generate Random Damage
  const getRandomDamage = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Fire Button Function
  //runs when the player clicks fire
  const handleFire = () => {
    //only do something if the game is still active
    if (gameStatus !== "active") return;

    //generate random damage for player and enemy using props
    const playerDamage = getRandomDamage(minDamage, maxDamage); // damage player deals to enemy
    const enemyDamage = getRandomDamage(minDamage, maxDamage); //damage enemy deals to player

    //update health for both sides
    const newPlayerHealth = Math.max(playerHealth - enemyDamage, 0); //never below zero
    const newEnemyHealth = Math.max(enemyHealth - playerDamage, 0); //never below zero

    setPlayerHealth(newPlayerHealth);
    setEnemyHealth(newEnemyHealth);

    //Check if game is over and update game status
    if (newPlayerHealth === 0 && newEnemyHealth === 0) {
      setGameStatus("draw"); //both died
    } else if (newEnemyHealth === 0) {
      setGameStatus("win"); //enemy died
    } else if (newPlayerHealth === 0) {
      setGameStatus("lose"); // player died
    }
  };

  // Runs when player clicks the "Restart" button
  const handleRestart = () => {
    setPlayerHealth(100);   // reset player health
    setEnemyHealth(100);    // reset enemy health
    setGameStatus("active"); // make game playable again
  };

  // --- MESSAGE TO SHOW WHEN GAME ENDS ---
  let message = "";
  if (gameStatus === "win") message = "🎉 You won the battle!";
  if (gameStatus === "lose") message = "💀 You were defeated...";
  if (gameStatus === "draw") message = "🤝 It's a draw!";

  // --- RENDER UI ---
  return (
    <div className="game-container">
      {/* Title */}
      <h1>🚀 Space Battle Simulator 🚀</h1>

      {/* Show current health */}
      <div className="health-bars">
        <p>🧑 Player Health: {playerHealth}</p>
        <p>👾 Enemy Health: {enemyHealth}</p>
      </div>

      {/* Conditional rendering: show Fire button if game is active, otherwise show result and Restart */}
      {gameStatus === "active" ? (
        <button className="fire-btn" onClick={handleFire}>
          🔥 Fire!
        </button>
      ) : (
        <>
          {/* Show message based on game outcome */}
          <p className="result">{message}</p>
          {/* Restart button */}
          <button className="restart-btn" onClick={handleRestart}>
            ♻️ Restart
          </button>
        </>
      )}
    </div>
  );
}

// Export the App component so React can render it
export default App;
