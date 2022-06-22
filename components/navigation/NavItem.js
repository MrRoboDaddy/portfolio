import Underline from "../animations/Underline";
import Tooltip from "../animations/Tooltip";
import { useState } from "react";

import styles from '../../styles/NavItem.module.css';

export default function NavItem({
  children,
  tooltipItems,
  tooltipUrl
}) {

  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={styles.container}
    >
      <Underline>
        {children}
      </Underline>
      <Tooltip
        visible={visible}
        tooltipItems={tooltipItems}
        tooltipUrl={tooltipUrl}
      />
    </div>
  );
}
