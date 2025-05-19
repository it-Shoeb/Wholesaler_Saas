import React, { useEffect } from "react";
import api from "../../services/api";
import { redirect } from "react-router-dom";

export default function ProtectedLoader() {
  try {
    const response = api.get("authentication/check", { withCredentials: true });

    if (response.data.success) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return redirect("/login");
    }
  } catch (error) {
    return redirect("/login");
  }
}
