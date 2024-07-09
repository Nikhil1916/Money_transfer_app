import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { SubBody } from './SubBody';
const Dashboard = () => {
  return (
    <div>
    {/* {balance.current} */}
      {/* <Header/> */}
      <SubBody/>
    </div>
  )
}

export default Dashboard