import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createClient } from 'contentful';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../components/layout/Layout';

import styles from '../styles/Contact.module.css';

export async function getStaticProps() {


  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ order: 'fields.date', content_type: 'navItem' });

  return {
    props: { navItems: res.items }
  };
}

export default function Contact({ navItems }) {

  const [submitted, setSubmitted] = useState(false);

  const success = () => toast.success('Message Sent!');

  const fail = () => toast.error('An error occured!');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  const onSubmit = data =>
    fetch('/api/contact', {
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 200) {
          setSubmitted(true);
          success();
        } else {
          fail();
        }
      });


  return (
    <Layout
      navItems={navItems}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              color: 'var(--primary)',
              background: 'var(--text)',
            },
          },
          error: {
            style: {
              color: 'white',
              background: 'rgb(246, 81, 75)',
            },
          },
        }}
      />
      <div className={styles.wrapper}>
        <h1>
          Contact
        </h1>
        <div className={styles.seperator} />
        {!submitted ?
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.name}>
              <div>
                <input type="text" placeholder="First name *" {...register("firstName", { required: 'This field is required', maxLength: 80 })} />
                {errors.firstName && <p>This field is required</p>}

              </div>
              <div>
                <input type="text" placeholder="Last name *" {...register("lastName", { required: 'This field is required', maxLength: 100 })} />
                {errors.lastName && <p>This field is required</p>}

              </div>
            </div>
            <input type="text" placeholder="Email *" {...register("email", { required: 'This field is required', pattern: /^\S+@\S+$/i })} />
            {errors.email?.type === 'required' && <p>This field is required</p>}
            {errors.email?.type === 'pattern' && <p>A valid email address is required</p>}
            <input type="text" placeholder="Subject *" {...register("subject", { required: 'This field is required' })} />
            {errors.subject && <p>This field is required</p>}
            <textarea placeholder="Message *"{...register("message", { required: 'This field is required' })} />
            {errors.message && <p>This field is required</p>}
            <input type="submit" style={{ marginTop: '0px' }} />
            <div className={styles.email}><strong>Email</strong>:{" "}rdemoss.media@gmail.com</div>
          </form>
          :
          <h1>Thank you!</h1>
        }

      </div>

    </Layout>
  );
}