import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSprite, toggleCollision, importSprites } from "../redux/spritesSlice";
import { AddSprites } from "./AddSprites";
import SpriteCard from "./SpriteCard";

const SpriteControls = () => {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpritId = spritesState.selectedSpriteId;
  const dispatch = useDispatch();
  const [showFileMenu, setShowFileMenu] = useState(false);

  const handleExport = () => {
    const spritesData = JSON.stringify(sprites);
    const blob = new Blob([spritesData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sprites_animations.json";
    a.click();
    URL.revokeObjectURL(url);
    setShowFileMenu(false);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSprites = JSON.parse(e.target.result);
          dispatch(importSprites(importedSprites));
        } catch (error) {
          console.error("Error parsing imported file:", error);
        }
      };
      reader.readAsText(file);
    }
    setShowFileMenu(false);
  };

  return (
    <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-lg">Sprites</p>
        <div className="flex gap-2">
          <div className="relative">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setShowFileMenu(!showFileMenu)}
            >
              <span className="mr-2">File</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {showFileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New</a>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Load from your computer
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleExport}>Save to your computer</a>
                </div>
              </div>
            )}
          </div>
          <AddSprites />
        </div>
      </div>
      <div className="flex items-center justify-between py-2 px-4 bg-white rounded-lg shadow-md mb-2">
        <label htmlFor="enableCollision" className="text-gray-700 font-medium mr-4">
          Swap Actions On Collision
        </label>
        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
          <input
            type="checkbox"
            id="enableCollision"
            className="opacity-0 w-0 h-0"
            checked={spritesState.showCollisionAnimation}
            onChange={(e) => {
              dispatch(toggleCollision({ showCollisionAnimation: e.target.checked }));
            }}
          />
          <label
            htmlFor="enableCollision"
            className={`absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${spritesState.showCollisionAnimation ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${spritesState.showCollisionAnimation ? 'transform translate-x-6' : ''}`}
            ></span>
          </label>
        </div>
      </div>
      <div className="flex gap-4 items-start overflow-x-auto">
        <div className="flex gap-2">
          {sprites.map((sprite, index) => (
            <SpriteCard
              key={index}
              spriteName={sprite.name}
              selected={sprite.id === selectedSpritId}
              onClick={(e) => {
                e.preventDefault()
                dispatch(selectSprite(sprite.id))
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpriteControls
