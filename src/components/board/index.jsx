/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import './board.css';

import Shell from '../shell';
import ModalWindow from '../modal-window';

const colors = [
  {
    color: '#ADFF2F', opened: false, id: 1, position: 1,
  },
  {
    color: '#00FA9A', opened: false, id: 2, position: 2,
  },
  {
    color: '#20B2AA', opened: false, id: 3, position: 3,
  },
  {
    color: '#7B68EE', opened: false, id: 4, position: 4,
  },
  {
    color: '#FFFF00', opened: false, id: 5, position: 5,
  },
  {
    color: '#FF1493', opened: false, id: 6, position: 6,
  },
  {
    color: '#FF4500', opened: false, id: 7, position: 7,
  },
  {
    color: '#808000', opened: false, id: 8, position: 8,
  },
  {
    color: '#ADFF2F', opened: false, id: 9, position: 9,
  },
  {
    color: '#00FA9A', opened: false, id: 10, position: 10,
  },
  {
    color: '#20B2AA', opened: false, id: 11, position: 11,
  },
  {
    color: '#7B68EE', opened: false, id: 12, position: 12,
  },
  {
    color: '#FFFF00', opened: false, id: 13, position: 13,
  },
  {
    color: '#FF1493', opened: false, id: 14, position: 14,
  },
  {
    color: '#FF4500', opened: false, id: 15, position: 15,
  },
  {
    color: '#808000', opened: false, id: 16, position: 16,
  },
];

const ShuffleArray = (colorArray) => {
  function random(array) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    if (array.findIndex((num) => num === randomIndex) !== -1) {
      return random(array);
    }
    return randomIndex;
  }
  const positionArray = [];

  return colorArray.map((color) => {
    const randomIndex = random(positionArray);
    positionArray.push(randomIndex);
    color.position = randomIndex;
    return color;
  });
};

const Board = () => {
  const [tiles, upadateTiles] = useState(colors);
  const [openedTiles, updateOpenedTiles] = useState([]);
  const [passedTiles, updatePasedTiles] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    upadateTiles(ShuffleArray(colors));
  }, []);

  useEffect(() => {
    if (passedTiles.length === 16) {
      setModal(true);
    }
  }, [passedTiles]);

  useEffect(() => {
    if (openedTiles.length === 2) {
      const [tile1, tile2] = openedTiles;
      if (tile1.color === tile2.color) {
        updatePasedTiles([...passedTiles, tile1, tile2]);
        updateOpenedTiles([]);
      } else {
        setTimeout(() => {
          const newTiles = [...tiles];
          newTiles[tile1.idx].opened = false;
          newTiles[tile2.idx].opened = false;
          upadateTiles(newTiles);
          updateOpenedTiles([]);
        }, 1000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedTiles]);

  const onClickTile = (id) => {
    if (openedTiles.length < 2) {
      if (openedTiles.length > 0 && openedTiles[0].id === id) {
        return;
      }
      let newTile = {};
      const newTiles = tiles.map((tile, idx) => {
        if (tile.id === id) {
          // eslint-disable-next-line no-param-reassign
          tile.opened = true;

          newTile = { ...tile, idx };
        }

        return tile;
      });

      upadateTiles(newTiles);
      updateOpenedTiles([...openedTiles, newTile]);
    }
  };

  const onRestart = () => {
    setModal(false);

    setTimeout(() => {
      updateOpenedTiles([]);
      updatePasedTiles([]);
      upadateTiles(() => {
        const newColors = ShuffleArray(colors);
        newColors.map((item) => {
          item.opened = false;
          return item;
        });

        return newColors;
      });
    }, 1000);
  };

  return (
    <div>
      <ul className="board">
        {
          tiles.sort((a, b) => b.position - a.position).map((tile) => {
            const { color, opened } = tile;
            return (
              <Shell
                color={color}
                opened={opened}
                key={tile.id}
                clickShuffle={() => onClickTile(tile.id)}
              />
            );
          })
        }
      </ul>
      <ModalWindow opened={modal} restart={onRestart} />
    </div>
  );
};

export default Board;
