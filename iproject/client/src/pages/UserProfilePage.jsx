import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'
import { LoadingPage, UploadProfilePicture } from '../components'

function UserProfilePage() {
    const { user, isLoading, profile, setProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = user?.uid

    const [username, SetUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthDay, setBirthDay] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return ''
        const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
        return `${cleanPhoneNumber.slice(0, 3)}-${cleanPhoneNumber.slice(3, 6)}-${cleanPhoneNumber.slice(6)}`
    }

    const handleEditProfile = async (e) => {
        e.preventDefault()
        try {
            const userUpdate = await updateDoc(doc(db, 'users', id), {
                username: username,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                birthDay: birthDay,
                photoURL: profilePicture,
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your profile has been updated",
                showConfirmButton: false,
                timer: 1500
            })
            setProfile({
                ...profile,
                username: username,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                birthDay: birthDay,
                photoURL: profilePicture,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeletePP = () => {
        setProfilePicture('')
    }

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login')
        }
    }, [user, isLoading])

    useEffect(() => {
        if (!isLoading && profile) {
            SetUsername(profile.username)
            setFullName(profile.fullName)
            setEmail(profile.email)
            setPhoneNumber(formatPhoneNumber(profile.phoneNumber))
            setBirthDay(profile.birthDay)
            setProfilePicture(profile.photoURL)

        }
    }, [isLoading, profile])

    if (isLoading) {
        return (
            <LoadingPage/>
        )
    }

    return (
        <div className='bg-[#F5F5F5] p-5 text-black'>
            <div className='border-b-[1px]'>
                <h1 className='text-xl font-bold mb-1'>My Profile</h1>
                <p className='mb-5'>Manage your profile information to control, protect, and secure your account.</p>
            </div>
            <form className='md:grid md:grid-cols-3' onSubmit={(e) => handleEditProfile(e)}>
                <div className='col-span-2'>
                    <fieldset className='grid grid-cols-2 my-3'>
                        <label>Username</label>
                        <input
                            className='p-2'
                            value={username ?? ''}
                            placeholder='Username'
                            type='text'
                            onChange={(e) => SetUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className='grid grid-cols-2 mb-3'>
                        <label>Name</label>
                        <input
                            className='p-2'
                            value={fullName ?? ''}
                            placeholder='Name'
                            type='text'
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className='grid grid-cols-2 mb-3'>
                        <label>Email</label>
                        <input
                            className='p-2'
                            value={email ?? ''}
                            placeholder='Your email'
                            disabled
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className='grid grid-cols-2 mb-3'>
                        <label>Phone Number</label>
                        <input
                            className='p-2'
                            value={phoneNumber ?? ''}
                            placeholder='Phone Number'
                            type='text'
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className='grid grid-cols-2 mb-3'>
                        <label>Date of Birth</label>
                        <input
                            className='p-2'
                            value={birthDay ?? ''}
                            placeholder='BirhtDay'
                            type='date'
                            onChange={(e) => setBirthDay(e.target.value)}
                        />
                    </fieldset>
                </div>
                <fieldset className='flex flex-col justify-center gap-5 items-center'>
                    <label className='hidden'>Profile Picture</label>
                    {profile?.photoURL === '' && profilePicture === '' ? (
                        <div className='w-24 h-24 border-2 border-black border-dashed text-center flex flex-col justify-center'>
                            <p>96 x 96</p>
                        </div>
                    ) : profilePicture === '' ? (
                        <div className='w-24 h-24 border-2 border-black border-dashed text-center flex flex-col justify-center'>
                            <p>96 x 96</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-1'>
                            <img className='size-24 object-cover rounded-md' src={profilePicture} alt={profile.fullName} />
                            <button
                                className='text-white p-1 rounded-md bg-red-500 hover:bg-red-400 w-fit'
                                onClick={handleDeletePP}
                                type='button'>
                                Delete
                            </button>
                        </div>
                    )}
                    <UploadProfilePicture setProfilePicture={setProfilePicture} />
                </fieldset>
                <div className='flex justify-end col-span-3 mt-5 md:mt-0'>
                    <button type='submit' className='py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-500 text-white'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default UserProfilePage