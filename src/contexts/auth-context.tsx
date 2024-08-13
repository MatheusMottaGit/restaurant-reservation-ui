import { LoginFormData, RegisterFormData } from "@/types/auth";
import { api } from "@/utils/axios";
import React, { createContext, useContext } from "react";
import Cookies from 'js-cookie'
import { JWTUserPayload } from "@/types/user";
import { jwtDecode } from 'jwt-decode'
import { LoginAPIResponse, RegisterAPIResponse } from "@/types/api/responses";

interface IAuthContext {
  signIn: (data: LoginFormData) => Promise<void>  
  signUp: (data: RegisterFormData) => Promise<void>  
  getToken: () => string | undefined
  decodeToken: () => JWTUserPayload
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  async function signIn({ email, password }: LoginFormData): Promise<void> {
    const response = await api.post<LoginAPIResponse>("/auth/login", { email, password })
    console.log(response)
    
    const token = response.data.token

    Cookies.set("auth:user", token, {
      expires: 2,
      secure: true
    })
  }

  async function signUp({ name, email, password }: RegisterFormData): Promise<void> {
    await api.post<RegisterAPIResponse>("/auth/register", { name, email, password })
  }

  function getToken(): string | undefined {
    return Cookies.get("auth:user")
  }

  function decodeToken(): JWTUserPayload {
    const token = Cookies.get("auth:user")

    if(!token) {
      throw new Error("Unauthorized.")
    }

    const userPayload: JWTUserPayload = jwtDecode(token)

    return userPayload
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, getToken, decodeToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const authContext = () => useContext(AuthContext)