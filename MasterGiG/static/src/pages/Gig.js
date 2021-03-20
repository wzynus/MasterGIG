import React from "react";
import { Breadcrumb } from '@themesberg/react-bootstrap';







export default () => {
    return (
      <>
    <Breadcrumb listProps={{ className: "breadcrumb-primary breadcrumb-text-light text-white" }}>
        <Breadcrumb.Item href="#home">Gig</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>





   </>
  );
};