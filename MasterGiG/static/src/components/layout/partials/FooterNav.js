import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="https://www.comp.nus.edu.sg/disa/bio/lekhsian/">Contact</Link>
        </li>
        <li>
          <Link to="https://www.comp.nus.edu.sg/disa/bio/lekhsian/">About us</Link>
        </li>
        <li>
          <Link to="https://www.comp.nus.edu.sg/disa/bio/lekhsian/">FAQ's</Link>
        </li>
        <li>
          <Link to="https://www.comp.nus.edu.sg/disa/bio/lekhsian/">Support</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;