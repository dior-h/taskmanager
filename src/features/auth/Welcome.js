import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Welcome = () => {

    const { username, isAdmin } = useAuth()
    
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (


        <>
        
        <section className='welcome'>

            <p>{today}</p>

        </section>
        </>



    );

        return content;

}

export default Welcome
