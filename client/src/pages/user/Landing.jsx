import React, { useEffect } from "react";
import CoverVideoComponent from "../../components/user/CoverVideoComponent";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import axios from "../../api/axios";
let GET_USER = "/getUser";

function Landing() {

  return <CoverVideoComponent />
}

export default Landing;
