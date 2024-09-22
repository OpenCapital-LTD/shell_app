import React from "react";
import '../../assets/styles/floater.scss';
import { CloseOutlined, FileProtectOutlined, HomeOutlined, MacCommandOutlined, SignatureOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Floater = () => {
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggingStarted, setDraggingStarted] = useState(false); // Track if dragging occurred

  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDraggingStarted(false); // Reset drag tracking
    // Calculate the offset between mouse position and the div's current position
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setDraggingStarted(true); // Set drag to true if movement happens
      // Update the position based on mouse movement
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const onIconClick = () => {
    if (!draggingStarted) {  // Only toggle if dragging didn't start
      setExpanded((t) => !t);
    }
  };

  return (
    <div
      className="floater"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: "grab",
      }}
    >
      <div
        onClick={onIconClick}
        className="menu_butt"
      >
        {expanded ? <CloseOutlined className="icon" /> : <MacCommandOutlined className="icon" />}
      </div>

      {expanded && (
        <div className="floater_menu">
          <div
            className="floater_app"
            onClick={() => {
              navigate('/');
              setExpanded(false);
            }}
          >
            <HomeOutlined />
          </div>
          <div
            className="floater_app"
            onClick={() => {
              navigate('/project_service');
              setExpanded(false);
            }}
          >
            <FileProtectOutlined />
          </div>
          <div className="floater_app">
            <SignatureOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

export default Floater;
