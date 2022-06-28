import { useForm } from 'react-hook-form';
import { createClient } from 'contentful';
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

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    }
  });

  const onSubmit = data => console.log(data);
  console.log(errors);


  return (
    <Layout
      navItems={navItems}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.name}>
          <div >
            <input type="text" placeholder="First name *" {...register("firstName", { required: 'This field is required', maxLength: 80 })} />
            {errors.firstName && <p>This field is required</p>}
          </div>
          <div>
            <input type="text" placeholder="Last name *" {...register("lastName", { required: 'This field is required', maxLength: 100 })} />
            {errors.lastName && <p>This field is required</p>}
          </div>
        </div>
        <input type="text" placeholder="Email *" {...register("email", { required: 'This field is required', pattern: /^\S+@\S+$/i })} />
        {errors.email && <p>This field is required</p>}
        <input type="text" placeholder="Subject *" {...register("subject", { required: 'This field is required' })} />
        {errors.subject && <p>This field is required</p>}
        <textarea placeholder="Message *"{...register("message", { required: 'This field is required' })} />
        {errors.message && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </Layout>
  );
}