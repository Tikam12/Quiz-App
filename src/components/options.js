import React from 'react';

const Options = ({ Qindex, name, checked, handleClick }) => {
  return (
    <div>
      <input
        style={{
          height: 20,
          width: 20,
          verticalAlign: 'middle',
          marginRight: 20,
        }}
        onClick={() => handleClick(Qindex, name)}
        checked={checked}
        type="radio"
      />
      {name}
    </div>
  );
};

export default Options;
