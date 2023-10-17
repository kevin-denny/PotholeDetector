import React, { useState } from "react";
import { Nav, Tab, Navbar } from "react-bootstrap";
import { IconButton, Tooltip } from "@mui/material";
import { ExitToAppOutlined, HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddImagesPage from "./AddImagesPage";


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();

  const tabClick = (eventKey) => {
    setActiveTab(eventKey);
  };

//   const signOut = async () => {
//     try {
//       await Auth.signOut();
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="d-flex align-items-center justify-content-between w-100 m-3">
          <Navbar.Brand>Home Page</Navbar.Brand>
          <div>
            <Tooltip title="Home">
              <IconButton aria-label="home" onClick={() => navigate("/")}>
                <HomeOutlined />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Logout">
              <IconButton aria-label="delete" onClick={signOut}>
                <ExitToAppOutlined />
              </IconButton>
            </Tooltip> */}
          </div>
        </div>
      </Navbar>

      <Tab.Container activeKey={activeTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="tab1" onClick={() => tabClick("tab1")}>
              Images
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2" onClick={() => tabClick("tab2")}>
              Videos
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="tab1">
            <br></br>
            <AddImagesPage />
          </Tab.Pane>
          <Tab.Pane eventKey="tab2">
            <br></br>
            {/* <InventoryForm /> */}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default HomePage;
