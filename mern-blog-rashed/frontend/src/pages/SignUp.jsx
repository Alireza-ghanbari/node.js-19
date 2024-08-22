import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.userName ||
      !formData.password
    ) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
        setLoading(true)
        setErrorMessage(null)

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()

        if(data.status == 'fail' || data.status == 'error'){
            setLoading(false)
            return setErrorMessage(data.message)
        }

        setLoading(false)
        if(res.ok){
            navigate('/sign-in')
        }

    } catch (error) {
        setErrorMessage(error.message)
        setLoading(false)
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-xl mx-auto flex-col md:items-center gap-5'>
          <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
            <div>
              <Label value='Your full name' />
              <TextInput
                type='text'
                placeholder='Full name'
                id='fullName'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='userName'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              color="dark"
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        
      </div>
    </div>
  );
}
