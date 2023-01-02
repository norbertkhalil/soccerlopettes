import React from 'react';
import Header from "./Header";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Saison2004 from '../assets/saison2004.png';
import Saison2005 from '../assets/saison2005.png';
import Saison2006 from '../assets/saison2006.png';
import Saison2007 from '../assets/saison2007.png';
import Saison2008 from '../assets/saison2008.png';
import Saison2009 from '../assets/saison2009.png';
import Saison2010 from '../assets/saison2010.png';
import Saison2011 from '../assets/saison2011.png';
import Saison2012 from '../assets/saison2012.png';
import Saison2013 from '../assets/saison2013.png';
import Saison2014 from '../assets/saison2014.png';
import Saison2015 from '../assets/saison2015.png';
import Saison2016 from '../assets/saison2016.png';
import Saison2017 from '../assets/saison2017.png';
import Saison2018 from '../assets/saison2018.png';
import M2004 from '../assets/2004.png';
import M2005 from '../assets/2005.png';
import M2006 from '../assets/2006.png';
import M2007 from '../assets/2007.png';
import M2008 from '../assets/2008.png';
import M2009 from '../assets/2009.png';
import M2010 from '../assets/2010.png';
import M2011 from '../assets/2011.png';
import M2012 from '../assets/2012.png';
import M2013 from '../assets/2013.png';
import M2014 from '../assets/2014.png';
import M2015 from '../assets/2015.png';
import M2016 from '../assets/2016.png';
import M2017 from '../assets/2017.png';
import M2018 from '../assets/2018.png';

import ImageGallery from 'react-image-gallery';

const listImages = [
  { original: Saison2018, thumbnail: M2018 }, { original: Saison2017, thumbnail: M2017 }, { original: Saison2016, thumbnail: M2016 },
  { original: Saison2015, thumbnail: M2015 }, { original: Saison2014, thumbnail: M2014 }, { original: Saison2013, thumbnail: M2013 },
  { original: Saison2012, thumbnail: M2012 }, { original: Saison2011, thumbnail: M2011 }, { original: Saison2010, thumbnail: M2010 },
  { original: Saison2009, thumbnail: M2009 }, { original: Saison2008, thumbnail: M2008 }, { original: Saison2007, thumbnail: M2007 },
  { original: Saison2006, thumbnail: M2006 }, { original: Saison2005, thumbnail: M2005 }, { original: Saison2004, thumbnail: M2004 },
];


export default class Historique extends React.Component {


  render() {
    return (
      <div className="Home">
        <Header hideDate="yes" />
        <ImageGallery items={listImages} thumbnailPosition="top" />
      </div>
    )
  }
}