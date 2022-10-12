import { makeAutoObservable } from 'mobx'

import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import { AuthResponse } from '../models/response/AuthResponse'

import axios from 'axios'
import { APIURL } from '../http'

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false

    constructor () {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async login(email: string, password: string) {
        await AuthService.login(email, password)
        .then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }

    async registration(email: string, password: string) {
        await AuthService.registration(email, password)
        .then(response => {
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }

    async logout() {
        await AuthService.logout()
        .then(response => {
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }

    async checkAuth() {
        this.setLoading(true)
        await axios.get<AuthResponse>(`${APIURL}/refresh`, {withCredentials: true})
        .then(response => {
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }).catch(error => {
            console.log(error.response.data.message);
        }).finally(() => {
            this.setLoading(false)
        })
    }
}