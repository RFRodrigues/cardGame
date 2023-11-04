import * as React from "react";
import { Link } from "react-router-dom";

interface menuConfigType {
  name: string;
  available: boolean;
  link: string;
} 

const menuConfig: menuConfigType[] = [
  { name: 'sueca', available: true, link: 'game' },
  { name: 'poker', available: false, link: '' },
  { name: 'blackjack', available: false, link: '' }, 
  { name: 'highscore', available: false, link: '' }
 ];

const Home: React.FC<any> = () => {

  return (
    <div className="menu-outer">
      {menuConfig.map(({name, link}) => {
           return <div className="link-outer"><Link className="menu-option" to={link}>{name}</Link></div>;
        })}
    </div>
  );
};

export default Home;