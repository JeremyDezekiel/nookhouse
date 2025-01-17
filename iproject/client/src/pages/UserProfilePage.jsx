import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Swal from 'sweetalert2'

function UserProfilePage() {
    const { user, isLoading, profile, setProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = user?.uid

    const [username, SetUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthDay, setBirthDay] = useState('')

    const handleEditProfile = async (e) => {
        e.preventDefault()
        try {
            const userUpdate = await updateDoc(doc(db, 'users', id), {
                username: username,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                birthDay: birthDay,
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
            })
        } catch (error) {
            console.error(error)
        }
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
            setPhoneNumber(profile.phoneNumber)
            setBirthDay(profile.birthDay)

        }
    }, [isLoading, profile])

    return (
        <div className='bg-[#F5F5F5] p-5'>
            <div className='border-b-[1px]'>
                <h1 className='text-xl font-bold mb-1'>My Profile</h1>
                <p className='mb-5'>Manage your profile information to control, protect, and secure your account.</p>
            </div>
            <div className='grid grid-cols-4'>
                <form className='col-span-3' onSubmit={(e) => handleEditProfile(e)}>
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
                    <div className='flex justify-end'>
                        <button type='submit' className='py-2 px-4 rounded-md bg-green-400 hover:bg-green-300'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfilePage