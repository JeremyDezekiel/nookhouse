import { useEffect } from "react"

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const passRegexNumber = /^(?=.*\d).+$/
const passRegexLowecase = /^(?=.*[a-z]).+$/
const passRegexUppercase = /^(?=.*[A-Z]).+$/
const passRegexEightCharacters = /^.{7,}.+$/

export const validatePassword = (password) => {
    if (password === '') {
        setPasswordError('Please create a new password.')
    } else if (!passRegex.test(password)) {
        setPasswordError('Password must be at least 8 characters with uppercase letters, lowercase letters, and numbers.')
    } else {
        setPasswordError('')
    }
}

export const listenInputPassword = (password) => {
        if (!passRegexNumber.test(password)) {
            setListenPasswordNumber('• Must contain one number')
        } else {
            setListenPasswordNumber('')
        }

        if (!passRegexLowecase.test(password)) {
            setListenPasswordLowercase('• Must contain one lowercase letter')
        } else {
            setListenPasswordLowercase('')
        }

        if (!passRegexUppercase.test(password)) {
            setListenPasswordUppercase('• Must contain one uppercase letter')
        } else {
            setListenPasswordUppercase('')
        }

        if (!passRegexEightCharacters.test(password)) {
            setListenPasswordEightCharacters('• Must contain at least 8 characters')
        } else {
            setListenPasswordEightCharacters('')
        }
    }