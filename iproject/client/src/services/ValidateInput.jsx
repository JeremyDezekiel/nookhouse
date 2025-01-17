import { useEffect, useState } from "react"

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const passRegexNumber = /^(?=.*\d).+$/
const passRegexLowecase = /^(?=.*[a-z]).+$/
const passRegexUppercase = /^(?=.*[A-Z]).+$/
const passRegexEightCharacters = /^.{7,}.+$/

export const ValidateInput = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [listenPasswordNumber, setListenPasswordNumber] = useState('')
    const [listenPasswordLowercase, setListenPasswordLowercase] = useState('')
    const [listenPasswordUppercase, setListenPasswordUppercase] = useState('')
    const [listenPasswordEightCharacters, setListenPasswordEightCharacters] = useState('')

    // Add and Edit Product

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [weight, setWeight] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [color, setColor] = useState('')
    const [discount, setDiscount] = useState('')
    const [discountPrice, setDiscountPrice] = useState('')

    const [nameLength, setNameLength] = useState(0)
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [isTouch, setIsTouch] = useState(false)
    const [isTouchImages, setIsTouchImages] = useState(false)

    const [nameError, setNameError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [imageError, setImageError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [stockError, setStockError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [lengthError, setLengthError] = useState('')
    const [widthError, setWidthError] = useState('')
    const [heightError, setHeightError] = useState('')
    const [colorError, setColorError] = useState('')
    const [discountError, setDiscountError] = useState('')

    // 

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const validateUsername = (username) => {
        if (username === '') {
            setUsernameError('Please enter a username.')
        } else {
            setUsernameError('')
        }
    }

    const validateEmail = (email) => {
        if (email === '') {
            setEmailError('Please enter a email.')
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email format.')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (password) => {
        if (password === '') {
            setPasswordError('Please create a new password.')
        } else if (!passRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters with uppercase letters, lowercase letters, and numbers.')
        } else {
            setPasswordError('')
        }
    }
    
    const listenInputPassword = (password) => {
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


    useEffect(() => {
        listenInputPassword(password)
    }, [password])

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Password and Confirm Password must be match.')
        } else {
            setConfirmPasswordError('')
        }
    }

    const validateLoginPassword = (password) => {
        if (password === '') {
            setPasswordError('Please enter a password')
        } else {
            setPasswordError('')
        }
    }

    // function validate data product

    const handleDiscount = () => {
        if (discount > 0 && discount <= 90 && price > 0) {
            setDiscountPrice(price - (price * (discount / 100)))
        } else {
            setDiscountPrice('')
        }
    }

    const handleDeleteImage = (indexToDelete) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToDelete))
    }

    const validateName = (name) => {
        if (name.length < 25) {
            setNameError('Product name must be at least 25 characters.')
        } else {
            setNameError('')
        }
    }

    const handleTouch = () => {
        setIsTouch(true)
    }

    const validateCategory = (category) => {
        if (category === '') {
            setCategoryError('Product category is required.')
        } else {
            setCategoryError('')
        }
    }

    const validateImage = (images) => {
        if (images.length < 1) {
            setImageError('Product must have at least 1 image.')
        } else {
            setImageError('')
        }
    }
    const handleTouchImages = () => {
        setIsTouchImages(true)
    }

    const validateDescription = (description) => {
        if (description === '') {
            setDescriptionError('Product description is required.')
        } else {
            setDescriptionError('')
        }
    }

    const validatePrice = (price) => {
        if (price === '') {
            setPriceError('The price is required to be filled in.')
        } else if (price < 100) {
            setPriceError('The minimum price of the product is Rp 100.')
        } else {
            setPriceError('')
        }
    }

    const validateStock = (stock) => {
        if (stock === '') {
            setStockError('The stock is required to be filled in.')
        } else {
            setStockError('')
        }
    }

    const validateWeight = (weight) => {
        if (weight === '' || weight < 1 || weight > 500000) {
            setWeightError('The weight must be between 1 gram and 500,000 grams.')
        } else {
            setWeightError('')
        }
    }

    const validateLength = (length) => {
        if (length === '' || length < 1 || length > 1000) {
            setLengthError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setLengthError('')
        }
    }

    const validateWidth = (width) => {
        if (width === '' || width < 1 || width > 1000) {
            setWidthError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setWidthError('')
        }
    }

    const validateHeight = (height) => {
        if (height === '' || height < 1 || height > 1000) {
            setHeightError('The dimensions must be between 1 cm and 1000 cm.')
        } else {
            setHeightError('')
        }
    }

    const validateColor = (color) => {
        if (color === '') {
            setColorError('Product description is required.')
        } else {
            setColorError('')
        }
    }

    const validateDiscount = (discount) => {
        if (discount > 90) {
            setDiscountError('Enter a discount of less than 90%.')
        } else {
            setDiscountError('')
        }
    }

    return {
        password, setPassword,
        passwordError,
        listenPasswordNumber,
        listenPasswordLowercase,
        listenPasswordUppercase,
        listenPasswordEightCharacters,
        validatePassword,
        email, setEmail,
        emailRegex,
        validateEmail,
        emailError,
        confirmPasswordError,
        validateConfirmPassword,
        validateLoginPassword,
        username, setUsername,
        usernameError,
        validateUsername,

        name, setName,
        category, setCategory,
        images, setImages,
        description, setDescription,
        price, setPrice,
        stock, setStock,
        weight, setWeight,
        length, setLength,
        width, setWidth,
        height, setHeight,
        color, setColor,
        discount, setDiscount,
        discountPrice, setDiscountPrice,
        nameLength, setNameLength,
        descriptionLength, setDescriptionLength,
        isTouch,
        isTouchImages,
        nameError,
        categoryError,
        imageError,
        descriptionError,
        priceError,
        stockError,
        weightError,
        lengthError,
        widthError,
        heightError,
        colorError,
        discountError,

        handleDiscount, handleDeleteImage, handleTouch, handleTouchImages,
        validateName,
        validateCategory,
        validateImage,
        validateDescription,
        validatePrice,
        validateStock,
        validateWeight,
        validateLength,
        validateWidth,
        validateHeight,
        validateColor,
        validateDiscount
    }
}