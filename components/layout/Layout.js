import React from 'react';
import Metatags from '../meta/Metatags';
import NavBar from '../navigation/NavBar';
import styles from '../../styles/Layout.module.css';
export default function Layout({
  children,
  title,
  description,
  image,
  navItems,
  color
}) {
  return (
    <div className={styles.container}>
      <Metatags
        title={title}
        description={description}
        image={image}
      />
      <main className={styles.main}>
        <NavBar
          color={color}
          navItems={navItems}
        />
        {children}
      </main>
    </div>
  );
}
