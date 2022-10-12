const jwt = require('jsonwebtoken')

const tokenModel = require('../models/TokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWTSECRETACCESS, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWTSECRETREFRESH, {expiresIn: '30d'})
        
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWTSECRETACCESS)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWTSECRETREFRESH)
            return userData
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService()